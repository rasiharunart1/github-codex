import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navbar() {
  return (
    <nav className="glass sticky top-3 z-40 mx-auto mt-4 flex w-[min(1100px,95%)] items-center justify-between rounded-2xl px-6 py-4 shadow-glow">
      <Link href="/" className="text-lg font-semibold gradient-text">NeonTutorials</Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/articles" className="hover:text-neon-cyan">Articles</Link>
        <Link href="/admin" className="hover:text-neon-pink">Admin</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
