'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
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

  const uuid = uuidv4();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('coupon', uuid);
    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`${pathname}${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={design}>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="container max-w-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12 items-center">
            <Image
              src="/ei-logo.svg"
              alt="Engineers Ireland Logo"
              width={300}
              height={256}
              priority
            />
            <Image
              src="/reedi-logo.svg"
              alt="REEdI Logo"
              width={300}
              height={256}
              priority
            />
          </div>

          {showScore ? (
            score >= QUESTION_CONFIG.minCorrect ? (
              showSVG ? (
                <Svg pathname={pathname} />
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
