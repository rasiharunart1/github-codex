import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { prisma } from '@/lib/prisma';
import { incrementArticleViews } from '@/lib/actions';
import { ArticleCard } from '@/components/article-card';
import { withDbFallback } from '@/lib/db-safe';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await withDbFallback(() => prisma.article.findUnique({ where: { slug: params.slug } }), null);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt
  };
}

export default async function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = await withDbFallback(
    () =>
      prisma.article.findUnique({
        where: { slug: params.slug },
        include: { category: true, articleTags: { include: { tag: true } } }
      }),
    null
  );

  if (!article || !article.published) notFound();

  await withDbFallback(() => incrementArticleViews(article.slug), undefined);

  const related = await withDbFallback(
    () =>
      prisma.article.findMany({
        where: {
          published: true,
          id: { not: article.id },
          categoryId: article.categoryId
        },
        include: { category: true },
        take: 3
      }),
    []
  );

  return (
    <div className="space-y-8">
      <header className="glass rounded-3xl p-8">
        <p className="text-sm text-neon-cyan">{article.category.name}</p>
        <h1 className="mt-2 text-4xl font-bold">{article.title}</h1>
        <p className="mt-3 text-slate-300">{article.excerpt}</p>
        <p className="mt-4 text-sm text-slate-400">{article.readingTime} min read · {article.views + 1} views</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.articleTags.map(({ tag }) => <span key={tag.id} className="rounded-full border border-white/20 px-3 py-1 text-xs">#{tag.name}</span>)}
        </div>
      </header>

      <article className="glass prose prose-invert max-w-none rounded-3xl p-8 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{article.content}</ReactMarkdown>
      </article>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Related Articles</h2>
        <div className="grid gap-4 md:grid-cols-3">{related.map((item) => <ArticleCard key={item.id} article={item} />)}</div>
      </section>
    </div>
  );
}
