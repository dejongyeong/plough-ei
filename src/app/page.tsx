'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Questions } from '@/components/Questions';
import { Score } from '@/components/Score';
import { Users } from '@/components/Users';
import { Toaster, toast } from 'sonner';

export default function Home() {
  const [mounted, setMounted] = useState(false); // handle flash of unstyled content
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => setMounted(true), []);
  const design = !mounted
    ? 'invisible'
    : 'visible bg-gradient-to-b from-sky-100 to-sky-700 p-5';

  return (
    <main className={design}>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="container max-w-xl">
          <Image
            src="/ei-logo.png"
            alt="Enterprise Ireland Logo"
            width={250}
            height={250}
            className="mb-16"
          />

          {showForm ? (
            <Users setShowScore={setShowScore} setShowForm={setShowForm} />
          ) : showScore ? (
            <Score score={score} />
          ) : (
            <Questions setScore={setScore} setShowForm={setShowForm} />
          )}
        </div>
      </div>
    </main>
  );
}
