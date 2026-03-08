import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://neon-tutorials.vercel.app'),
  title: {
    default: 'NeonTutorials | Cyberpunk Blog Platform',
    template: '%s | NeonTutorials'
  },
  description: 'Modern tutorial and blog platform with futuristic UI and admin dashboard.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        <main className="mx-auto w-[min(1100px,95%)] py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
