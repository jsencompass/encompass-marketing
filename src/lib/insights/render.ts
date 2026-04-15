import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: ["typescript", "javascript", "json", "bash", "css", "html", "markdown"],
    });
  }
  return highlighterPromise;
}

export async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter();

  // Step 1: Extract and replace code blocks with placeholders
  const codeBlocks: string[] = [];
  const processed = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || "text";
    let rendered: string;
    try {
      rendered = highlighter.codeToHtml(code.trimEnd(), {
        lang: language,
        theme: "github-dark-dimmed",
      });
      rendered = `<div data-rehype-pretty-code-figure><div data-rehype-pretty-code-title>${language}</div>${rendered}</div>`;
    } catch {
      rendered = `<pre style="background:var(--bg-elevated);padding:16px;border-radius:8px;overflow-x:auto;border:1px solid var(--border)"><code>${escapeHtml(code.trimEnd())}</code></pre>`;
    }
    const idx = codeBlocks.length;
    codeBlocks.push(rendered);
    return `\n%%CODEBLOCK_${idx}%%\n`;
  });

  // Step 2: Process line-by-line (headings, paragraphs, blockquotes)
  const lines = processed.split("\n");
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Code block placeholder
    const cbMatch = trimmed.match(/^%%CODEBLOCK_(\d+)%%$/);
    if (cbMatch) {
      result.push(codeBlocks[parseInt(cbMatch[1])]);
      continue;
    }

    // Empty line
    if (trimmed === "") continue;

    // Headings
    if (trimmed.startsWith("## ")) {
      result.push(`<h2 class="mt-12 mb-4 text-24 font-semibold text-text-primary">${trimmed.slice(3)}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      result.push(`<h3 class="mt-8 mb-3 text-18 font-semibold text-text-primary">${trimmed.slice(4)}</h3>`);
    } else if (trimmed.startsWith("> ")) {
      result.push(`<blockquote class="my-8 border-l-3 border-accent pl-6 text-18 italic leading-relaxed text-text-secondary" style="border-left:3px solid var(--accent)">${trimmed.slice(2)}</blockquote>`);
    } else if (trimmed.startsWith("---")) {
      result.push('<hr class="my-8 border-border" />');
    } else if (trimmed.startsWith("*Originally published")) {
      // Attribution line — render as small italic
      const attribution = trimmed
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-text underline underline-offset-4" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/^\*/, "").replace(/\*$/, "");
      result.push(`<p class="mt-12 text-14 italic text-text-tertiary">${attribution}</p>`);
    } else if (!trimmed.startsWith("<")) {
      // Regular paragraph
      const p = trimmed
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-text underline underline-offset-4">$1</a>');
      result.push(`<p class="mb-6 text-16 leading-relaxed text-text-secondary">${p}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
