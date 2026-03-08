import { ArticleCard } from '@/components/article-card';
import { getPublishedArticles } from '@/lib/data';

export const dynamic = 'force-dynamic';
export default async function ArticlesPage({ searchParams }: { searchParams: { search?: string } }) {
  const articles = await getPublishedArticles(searchParams.search);

  return (
    <div>
      <h1 className="text-4xl font-bold gradient-text">Articles</h1>
      <form className="glass mt-6 rounded-2xl p-4">
        <input
          type="text"
          name="search"
          defaultValue={searchParams.search}
          placeholder="Search tutorials, tags, or keywords"
          className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none focus:border-neon-cyan"
        />
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
