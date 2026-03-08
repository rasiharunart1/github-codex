import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { withDbFallback } from '@/lib/db-safe';

export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://neon-tutorials.vercel.app';
  const articles = await withDbFallback(
    () => prisma.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    []
  );

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: article.updatedAt
    }))
  ];
}
