'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((prev) => !prev)}
      className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-neon-cyan"
    >
      {dark ? 'Dark' : 'Light'} Mode
    </button>
  );
}
