'use client';

import { useEffect, useState } from 'react';

import Questions from '@/components/Questions';
import Score from '@/components/Score';
import Image from 'next/image';

export default function Home() {
  const [mounted, setMounted] = useState(false); // handle flash of unstyled content
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => setMounted(true), []);
  const design = !mounted
    ? 'invisible'
    : 'visible bg-gradient-to-b from-sky-100 to-sky-700';

  return (
    <main className={design}>
      <div className=" h-screen flex flex-col items-center justify-center ">
        <div className="max-[480px]:m-5 max-[768px]:w-11/12 max-[1024px]:w-4/5 min-[1025px]:w-2/4 ">
          <Image
            src="/ei-logo.png"
            alt="Enterprise Ireland Logo"
            width={250}
            height={250}
            className="mb-16"
          />

          {showScore ? (
            <Score score={score} />
          ) : (
            <Questions setScore={setScore} setShowScore={setShowScore} />
          )}
        </div>
      </div>
    </main>
  );
}
