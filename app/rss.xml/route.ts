import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  let articles: Array<{ title: string; slug: string; excerpt: string; createdAt: Date }> = [];

  try {
    articles = await prisma.article.findMany({
      where: { published: true },
      select: { title: true, slug: true, excerpt: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 20
    });
  } catch {
    // Fallback for environments where DB tables are not migrated yet.
    articles = [];
  }

  const items = articles
    .map(
      (article) => `
      <item>
        <title><![CDATA[${article.title}]]></title>
        <link>https://neon-tutorials.vercel.app/articles/${article.slug}</link>
        <description><![CDATA[${article.excerpt}]]></description>
        <pubDate>${article.createdAt.toUTCString()}</pubDate>
      </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>NeonTutorials RSS</title>
      <link>https://neon-tutorials.vercel.app</link>
      <description>Latest futuristic tutorials</description>${items}
    </channel>
  </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
