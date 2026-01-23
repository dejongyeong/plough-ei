"use client";

import { useEffect, useRef } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const mounted = useRef(false); // handle flash of unstyled content
  useEffect(() => {
    mounted.current = true;
  }, []);

  const design = !mounted
    ? "invisible"
    : "visible bg-gradient-to-b from-sky-100 to-sky-700";

  return (
    <main className={design}>
      <Toaster richColors />
      {children}
    </main>
  );
};

export default Providers;
