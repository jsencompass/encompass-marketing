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

  // Process code blocks first (before paragraph wrapping)
  let html = content;

  // Fenced code blocks: ```lang ... ```
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    const language = lang || "text";
    try {
      const highlighted = highlighter.codeToHtml(code.trimEnd(), {
        lang: language,
        theme: "github-dark-dimmed",
      });
      return `<div data-rehype-pretty-code-figure><div data-rehype-pretty-code-title>${language}</div>${highlighted}</div>`;
    } catch {
      return `<pre style="background:var(--bg-elevated);padding:16px;border-radius:8px;overflow-x:auto;border:1px solid var(--border)"><code>${escapeHtml(code.trimEnd())}</code></pre>`;
    }
  });

  // Now process the rest line by line
  const lines = html.split("\n");
  const result: string[] = [];
  let inBlock = false;

  for (const line of lines) {
    // Skip lines that are part of a code block we already processed
    if (line.includes("data-rehype-pretty-code-figure")) {
      result.push(line);
      inBlock = !line.includes("</div></div>");
      continue;
    }
    if (inBlock) {
      result.push(line);
      if (line.includes("</div></div>")) inBlock = false;
      continue;
    }

    // Headings
    if (line.startsWith("## ")) {
      result.push(`<h2 class="mt-12 mb-4 text-24 font-semibold text-text-primary">${line.slice(3)}</h2>`);
    } else if (line.startsWith("### ")) {
      result.push(`<h3 class="mt-8 mb-3 text-18 font-semibold text-text-primary">${line.slice(4)}</h3>`);
    } else if (line.startsWith("> ")) {
      result.push(`<blockquote class="my-8 border-l-3 border-accent pl-6 text-18 italic leading-relaxed text-text-secondary" style="border-left:3px solid var(--accent)">${line.slice(2)}</blockquote>`);
    } else if (line.trim() === "") {
      // empty line
    } else if (!line.startsWith("<")) {
      // Regular paragraph
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary">$1</strong>')
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, '<code>$1</code>');
      result.push(`<p class="mb-6 text-16 leading-relaxed text-text-secondary">${processed}</p>`);
    } else {
      result.push(line);
    }
  }

  return result.join("\n");
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
