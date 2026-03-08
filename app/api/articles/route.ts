import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime, makeSlug } from '@/lib/utils';

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? undefined;
  const articles = await prisma.article.findMany({
    where: {
      ...(search
        ? { OR: [{ title: { contains: search, mode: 'insensitive' } }, { excerpt: { contains: search, mode: 'insensitive' } }] }
        : {})
    },
    include: { category: true, articleTags: { include: { tag: true } } },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(articles);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const article = await prisma.article.create({
    data: {
      title: body.title,
      slug: makeSlug(body.title),
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      categoryId: body.categoryId,
      authorId: body.authorId,
      published: Boolean(body.published),
      featured: Boolean(body.featured),
      readingTime: calculateReadingTime(body.content)
    }
  });

  return NextResponse.json(article, { status: 201 });
}
