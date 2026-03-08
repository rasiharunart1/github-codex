import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ArticleCard } from '@/components/article-card';

export default async function HomePage() {
  const [featured, categories, latest] = await Promise.all([
    prisma.article.findMany({ where: { published: true, featured: true }, take: 3, include: { category: true }, orderBy: { createdAt: 'desc' } }),
    prisma.category.findMany({ take: 8, orderBy: { createdAt: 'desc' } }),
    prisma.article.findMany({ where: { published: true }, take: 6, include: { category: true }, orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="space-y-16">
      <section className="glass rounded-3xl p-8 md:p-12 shadow-glow">
        <p className="text-sm text-neon-cyan">Future-proof your dev career</p>
        <h1 className="mt-3 text-4xl font-bold md:text-6xl gradient-text">Cyberpunk Tutorials for Modern Builders</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Learn Next.js, Prisma, TypeScript, and deployment workflows through practical tutorials from elite engineers.</p>
        <div className="mt-6 flex gap-4">
          <Link href="/articles" className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-3 font-medium text-slate-950">Explore Tutorials</Link>
          <Link href="/admin" className="rounded-xl border border-white/20 px-5 py-3">Admin Panel</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Featured Tutorials</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category.id} href={`/articles?search=${category.slug}`} className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-neon-pink">
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-2xl font-semibold">Latest Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {latest.map((article) => <ArticleCard key={article.id} article={article} />)}
        </div>
      </section>

      <section className="glass rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold">Get fresh tutorials in your inbox</h2>
        <form className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="you@future.dev" className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 outline-none focus:border-neon-cyan" />
          <button className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink px-6 py-3 font-semibold">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
