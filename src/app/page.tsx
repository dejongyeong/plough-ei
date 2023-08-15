'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Questions } from '@/components/Questions';
import { Toaster } from 'sonner';
import { QUESTION_CONFIG } from '@/lib/constant';
import { Incorrect } from '@/components/Incorrect';
import { Correct } from '@/components/Correct';
import { Svg } from '@/components/Svg';

export default function Home() {
  const [mounted, setMounted] = useState(false); // handle flash of unstyled content
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showSVG, setShowSVG] = useState(false);

  useEffect(() => setMounted(true), []);
  const design = !mounted
    ? 'invisible'
    : 'visible bg-gradient-to-b from-sky-100 to-sky-700 p-5';

  return (
    <main className={design}>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="container max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12 items-center">
            <Image
              src="/ei-logo.svg"
              alt="Engineers Ireland Logo"
              width={300}
              height={256}
            />
            <Image
              src="/reedi-logo.svg"
              alt="REEdI Logo"
              width={300}
              height={256}
            />
          </div>

          {showScore ? (
            score >= QUESTION_CONFIG.minCorrect ? (
              showSVG ? (
                <Svg />
              ) : (
                <Correct score={score} setShowSVG={setShowSVG} />
              )
            ) : (
              <Incorrect score={score} />
            )
          ) : (
            <Questions setScore={setScore} setShowScore={setShowScore} />
          )}
        </div>
      </div>
    </main>
  );
}
