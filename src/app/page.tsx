'use client';

import { useEffect, useState } from 'react';

import Questions from '@/components/Questions';
import Score from '@/components/Score';

export default function Home() {
  const [mounted, setMounted] = useState(false); // handle flash of unstyled content
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => setMounted(true), []);
  const design = !mounted
    ? 'invisible'
    : 'visible flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-sky-700';

  return (
    <main className={design}>
      <div className="max-[480px]:m-5 max-[768px]:w-11/12 max-[1024px]:w-4/5 min-[1025px]:w-2/4">
        {!showScore ? (
          <Score score={score} />
        ) : (
          <Questions setScore={setScore} setShowScore={setShowScore} />
        )}
      </div>
    </main>
  );
}
