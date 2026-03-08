import { prisma } from '@/lib/prisma';

export async function getPublishedArticles(search?: string) {
  return prisma.article.findMany({
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
  });
}
