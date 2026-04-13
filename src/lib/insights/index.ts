import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { authors, type Author } from "./authors";

const CONTENT_DIR = path.join(process.cwd(), "src/content/insights");

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: Author;
  authorKey: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: string;
  canonicalUrl?: string;
  originalPublication?: string;
  content: string;
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      return getPostBySlug(slug);
    })
    .filter((p): p is Post => p !== null)
    .filter((p) => process.env.NODE_ENV === "development" || !p.draft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    author: authors[data.author as string] || authors.encompass,
    authorKey: data.author || "encompass",
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    tags: data.tags || [],
    featured: data.featured || false,
    draft: data.draft || false,
    readingTime: rt.text,
    canonicalUrl: data.originallyPublished?.url,
    originalPublication: data.originallyPublished?.publication,
    content,
  };
}
