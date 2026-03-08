import Link from 'next/link';
import { format } from 'date-fns';

interface Props {
  article: {
    title: string;
    slug: string;
    excerpt: string;
    createdAt: Date;
    readingTime: number;
    category: { name: string };
  };
}

export function ArticleCard({ article }: Props) {
  return (
    <article className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
      <p className="text-xs uppercase tracking-wide text-neon-cyan">{article.category.name}</p>
      <h3 className="mt-2 text-xl font-semibold">{article.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{article.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{format(article.createdAt, 'MMM dd, yyyy')}</span>
        <span>{article.readingTime} min read</span>
      </div>
      <Link href={`/articles/${article.slug}`} className="mt-4 inline-block text-sm text-neon-pink hover:text-neon-cyan">
        Read tutorial →
      </Link>
    </article>
  );
}
