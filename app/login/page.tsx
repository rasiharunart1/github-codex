'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const result = await signIn('credentials', { email, password, redirect: true, callbackUrl: '/admin' });
    if (result?.error) setError('Invalid credentials');
  }

  return (
    <div className="mx-auto max-w-md glass rounded-2xl p-8">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <form action={onSubmit} className="mt-6 space-y-4">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3" required />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-3 font-semibold text-slate-950">Sign in</button>
      </form>
    </div>
  );
}
