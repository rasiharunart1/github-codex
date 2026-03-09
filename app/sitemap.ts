import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://neon-tutorials.vercel.app';
  let articles: Array<{ slug: string; updatedAt: Date }> = [];

  try {
    articles = await prisma.article.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } });
  } catch {
    // Fallback for environments where DB tables are not migrated yet.
    articles = [];
  }

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/articles`, lastModified: new Date() },
    ...articles.map((article) => ({
      url: `${base}/articles/${article.slug}`,
      lastModified: article.updatedAt
    }))
  ];
}
