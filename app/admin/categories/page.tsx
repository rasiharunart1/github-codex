import { createCategoryAction } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  let categories: Awaited<ReturnType<typeof prisma.category.findMany>> = [];

  try {
    categories = await prisma.category.findMany({ orderBy: { createdAt: 'desc' } });
  } catch {
    // Render empty state if schema is not present yet.
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Categories</h1>
      <form action={createCategoryAction} className="glass flex gap-3 rounded-2xl p-6">
        <input name="name" placeholder="New category" className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <button className="rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-5 py-3 font-semibold text-slate-950">Add</button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((category) => <div key={category.id} className="glass rounded-xl p-4">{category.name}</div>)}
      </div>
    </div>
  );
}
