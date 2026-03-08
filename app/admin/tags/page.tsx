import { createTagAction } from '@/lib/actions';
import { prisma } from '@/lib/prisma';

export default async function AdminTagsPage() {
  const tags = await prisma.tag.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tags</h1>
      <form action={createTagAction} className="glass flex gap-3 rounded-2xl p-6">
        <input name="name" placeholder="New tag" className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <button className="rounded-xl bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-3 font-semibold">Add</button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        {tags.map((tag) => <div key={tag.id} className="glass rounded-xl p-4">#{tag.name}</div>)}
      </div>
    </div>
  );
}
