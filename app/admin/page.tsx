import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  let articles = 0;
  let categories = 0;
  let tags = 0;
  let viewsTotal = 0;

  try {
    const [articlesCount, categoriesCount, tagsCount, views] = await Promise.all([
      prisma.article.count(),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.article.aggregate({ _sum: { views: true } })
    ]);

    articles = articlesCount;
    categories = categoriesCount;
    tags = tagsCount;
    viewsTotal = views._sum.views ?? 0;
  } catch {
    // Keep zero-state dashboard when DB schema is unavailable.
  }

  const cards = [
    { label: 'Articles', value: articles },
    { label: 'Categories', value: categories },
    { label: 'Tags', value: tags },
    { label: 'Views', value: viewsTotal }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold gradient-text">Dashboard Analytics</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="glass rounded-2xl p-6">
            <p className="text-sm text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-neon-cyan">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
