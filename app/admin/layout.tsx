import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') redirect('/login');

  return (
    <div className="grid gap-6 md:grid-cols-[240px,1fr]">
      <aside className="glass h-fit rounded-2xl p-4">
        <h2 className="mb-4 text-lg font-semibold">Admin</h2>
        <nav className="space-y-2 text-sm">
          <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/admin">Overview</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/admin/articles">Articles</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/admin/categories">Categories</Link>
          <Link className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/admin/tags">Tags</Link>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
