'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false); // handle flash of unstyled content

  useEffect(() => setMounted(true), []);
  const design = !mounted
    ? 'invisible'
    : 'visible bg-gradient-to-b from-sky-100 to-sky-700';

  return (
    <main className={design}>
      <Toaster richColors />
      {children}
    </main>
  );
};

export default Providers;
