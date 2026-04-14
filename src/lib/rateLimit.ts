import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

export async function rateLimit({
  key,
  limit,
  windowSeconds,
}: {
  key: string;
  limit: number;
  windowSeconds: number;
}): Promise<{ allowed: boolean; remaining: number; resetAt: Date }> {
  const store = getRedis();
  const resetAt = new Date(Date.now() + windowSeconds * 1000);

  if (!store) {
    if (process.env.NODE_ENV === "production") {
      console.error("[rateLimit] Missing Redis credentials in production — failing closed");
      return { allowed: false, remaining: 0, resetAt };
    }
    console.warn("[rateLimit] Redis not configured — rate limiting disabled in dev");
    return { allowed: true, remaining: limit, resetAt };
  }

  try {
    const count = await store.incr(key);
    if (count === 1) {
      await store.expire(key, windowSeconds);
    }
    const remaining = Math.max(0, limit - count);
    return { allowed: count <= limit, remaining, resetAt };
  } catch (err) {
    console.warn("[rateLimit] Redis error — allowing request:", (err as Error).message);
    return { allowed: true, remaining: limit, resetAt };
  }
}
