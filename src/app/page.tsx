'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { Questions } from '@/components/Questions';
import { QUESTION_CONFIG } from '@/lib/constant';
import { Incorrect } from '@/components/incorrect';
import { Svg } from '@/components/svg';
import { Welcome } from '@/components/welcome';
import { Gdpr } from '@/components/gdpr';

export default function Home() {
  const [profession, setProfession] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // user already been saved to database
  // const [isSaved, setIsSaved] = useState(false);

  const [showSVG, setShowSVG] = useState(false);

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

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     const value = localStorage.getItem('plough-ei');
  //     if (value) setIsSaved(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Todo: check if else statement and questions, set timer for re-answering the questions
  if (!profession) {
    return <Welcome setProfession={setProfession} />;
  } else {
    if (profession === 'student') {
      if (showScore) {
        if (score >= QUESTION_CONFIG.minCorrect) {
          return <Svg pathname={pathname} />;
        } else {
          return (
            <Incorrect
              score={score}
              setScore={setScore}
              setShowScore={setShowScore}
            />
          );
        }
      } else {
        return <Questions setScore={setScore} setShowScore={setShowScore} />;
      }
    } else {
      if (showQuestion) {
        if (showScore) {
          if (score >= QUESTION_CONFIG.minCorrect) {
            return <Svg pathname={pathname} />;
          } else {
            return (
              <Incorrect
                score={score}
                setScore={setScore}
                setShowScore={setShowScore}
              />
            );
          }
        } else {
          return <Questions setScore={setScore} setShowScore={setShowScore} />;
        }
      } else {
        return <Gdpr setShowQuestion={setShowQuestion} />;
      }
    }
  }
}

// if(isSaved) {
//   if(showScore) {
//     if(score >= QUESTION_CONFIG.minCorrect) {
//       return <Svg pathname={pathname} />;
//     } else {
//       return <Incorrect score={score} />;
//     }
//   } else {
//     return <Questions setScore={setScore} setShowScore={setShowScore} />;
//   }
// } else {
//   return <Gdpr setShowQuestion={setShowQuestion} />;
// }
