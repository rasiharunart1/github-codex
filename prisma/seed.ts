import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin12345', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@neonblog.dev' },
    update: {},
    create: {
      name: 'Neon Admin',
      email: 'admin@neonblog.dev',
      password,
      role: Role.ADMIN
    }
  });

  const category = await prisma.category.upsert({
    where: { slug: 'nextjs' },
    update: {},
    create: { name: 'Next.js', slug: 'nextjs' }
  });

  const tag = await prisma.tag.upsert({
    where: { slug: 'app-router' },
    update: {},
    create: { name: 'App Router', slug: 'app-router' }
  });

  const article = await prisma.article.upsert({
    where: { slug: 'build-futuristic-blog-with-nextjs' },
    update: {},
    create: {
      title: 'Build a Futuristic Blog with Next.js 14',
      slug: 'build-futuristic-blog-with-nextjs',
      excerpt: 'Launch a high-performance tutorial platform using modern App Router patterns.',
      content: '# Cyberpunk Blog\n\nUse **React Server Components** for speed.',
      categoryId: category.id,
      authorId: admin.id,
      published: true,
      featured: true,
      readingTime: 4
    }
  });

  await prisma.articleTag.upsert({
    where: { articleId_tagId: { articleId: article.id, tagId: tag.id } },
    update: {},
    create: { articleId: article.id, tagId: tag.id }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
