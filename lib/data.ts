import { prisma } from '@/lib/prisma';
import { withDbFallback } from '@/lib/db-safe';

export async function getPublishedArticles(search?: string) {
  return withDbFallback(
    () =>
      prisma.article.findMany({
        where: {
          published: true,
          ...(search
            ? {
                OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { excerpt: { contains: search, mode: 'insensitive' } },
                  { articleTags: { some: { tag: { name: { contains: search, mode: 'insensitive' } } } } }
                ]
              }
            : {})
        },
        orderBy: { createdAt: 'desc' },
        include: { category: true, articleTags: { include: { tag: true } } }
      }),
    []
  );
}
