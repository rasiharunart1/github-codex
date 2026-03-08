'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime, makeSlug } from '@/lib/utils';

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
}

export async function createCategoryAction(formData: FormData) {
  await assertAdmin();
  const name = String(formData.get('name') || '');
  await prisma.category.create({
    data: {
      name,
      slug: makeSlug(name)
    }
  });
  revalidatePath('/admin/categories');
}

export async function createTagAction(formData: FormData) {
  await assertAdmin();
  const name = String(formData.get('name') || '');
  await prisma.tag.create({
    data: {
      name,
      slug: makeSlug(name)
    }
  });
  revalidatePath('/admin/tags');
}

export async function incrementArticleViews(slug: string) {
  await prisma.article.update({ where: { slug }, data: { views: { increment: 1 } } });
}

export async function createArticleAction(formData: FormData) {
  await assertAdmin();
  const title = String(formData.get('title') || '');
  const excerpt = String(formData.get('excerpt') || '');
  const content = String(formData.get('content') || '');
  const categoryId = String(formData.get('categoryId') || '');
  const coverImage = String(formData.get('coverImage') || '');
  const published = formData.get('published') === 'on';
  const featured = formData.get('featured') === 'on';

  await prisma.article.create({
    data: {
      title,
      slug: makeSlug(title),
      excerpt,
      content,
      coverImage,
      categoryId,
      authorId: String(formData.get('authorId') || ''),
      published,
      featured,
      readingTime: calculateReadingTime(content)
    }
  });

  revalidatePath('/admin/articles');
  revalidatePath('/articles');
}
