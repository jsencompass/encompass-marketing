import type { Post } from "./index";

export function getAdjacentPosts(currentSlug: string, allPosts: Post[]) {
  const sorted = [...allPosts].sort(
    (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
  );
  const currentIndex = sorted.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1 || sorted.length <= 1) return { next: null, prev: null };
  const nextIndex = (currentIndex + 1) % sorted.length;
  const prevIndex = (currentIndex - 1 + sorted.length) % sorted.length;
  return { next: sorted[nextIndex], prev: sorted[prevIndex] };
}
