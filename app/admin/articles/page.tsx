import { createArticleAction } from '@/lib/actions';
import { prisma } from '@/lib/prisma';
import { withDbFallback } from '@/lib/db-safe';

export const dynamic = 'force-dynamic';
export default async function AdminArticlesPage() {
  const [articles, categories, admins] = await withDbFallback(
    () =>
      Promise.all([
        prisma.article.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } }),
        prisma.category.findMany(),
        prisma.user.findMany({ where: { role: 'ADMIN' } })
      ]),
    [[], [], []]
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Articles</h1>
      <form action={createArticleAction} className="glass grid gap-3 rounded-2xl p-6 md:grid-cols-2">
        <input name="title" placeholder="Title" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <input name="excerpt" placeholder="Excerpt" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <input name="coverImage" placeholder="Cover image URL" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3" />
        <select name="categoryId" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3" required>
          {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        <select name="authorId" className="rounded-xl border border-white/20 bg-black/30 px-4 py-3" required>
          {admins.map((admin) => <option key={admin.id} value={admin.id}>{admin.email}</option>)}
        </select>
        <div className="flex items-center gap-5 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" name="published" /> Published</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" /> Featured</label>
        </div>
        <textarea name="content" placeholder="Markdown content" className="md:col-span-2 min-h-48 rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <button className="md:col-span-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-3 font-semibold text-slate-950">Create Article</button>
      </form>

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-left">
            <tr><th className="px-4 py-3">Title</th><th>Status</th><th>Category</th><th>Created</th></tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-white/5">
                <td className="px-4 py-3">{article.title}</td>
                <td>{article.published ? 'Published' : 'Draft'}</td>
                <td>{article.category.name}</td>
                <td>{article.createdAt.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
