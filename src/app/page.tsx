"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { QUESTION_CONFIG } from "@/lib/constant";

import { Questions } from "@/components/questions";
import { Welcome } from "@/components/welcome";
import { Svg } from "@/components/svg";
import { Incorrect } from "@/components/incorrect";
import { Gdpr } from "@/components/gdpr";

function HomeContent() {
  const [profession, setProfession] = useState(null);
  const [showSvg, setShowSvg] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  // user already been saved to database
  const [storedValue, setStoredValue] = useState<any>(null);

  const uuid = uuidv4();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("coupon", uuid);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const value = localStorage.getItem("plough-ei");
      if (value) setStoredValue(JSON.parse(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!profession) {
    return <Welcome setProfession={setProfession} />;
  } else {
    if (!showScore) {
      return (
        <Questions
          profession={profession}
          setScore={setScore}
          setShowScore={setShowScore}
          isStored={storedValue?.quiz}
        />
      );
    } else {
      if (score >= QUESTION_CONFIG.minCorrect) {
        if (profession === "student") {
          return <Svg pathname={pathname} />;
        } else {
          if (storedValue?.quiz) {
            return <Svg pathname={pathname} />;
          } else {
            if (showSvg) {
              return <Svg pathname={pathname} />;
            } else {
              return <Gdpr setShowSvg={setShowSvg} />; // only collect user data once and hide form - assumption based on device
            }
          }
        }
      } else {
        return (
          <Incorrect
            score={score}
            setScore={setScore}
            setShowScore={setShowScore}
          />
        );
      }
    }
  }
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
