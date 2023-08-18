'use client';

import { Typography, Button } from 'antd';
import { QUESTION_CONFIG } from '@/lib/constant';
import { toast } from 'sonner';
import React from 'react';

const { Title, Text } = Typography;

interface IncorrectProps {
  score: number;
  setShowScore: React.Dispatch<React.SetStateAction<boolean>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export function Incorrect({ score, setShowScore, setScore }: IncorrectProps) {
  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      <div className="flex flex-col px-6 mt-2 space-y-2">
        <Title level={3} className="!text-custom-color">
          Better luck next time!🍀
        </Title>
        <Text type="secondary">
          You score:{' '}
          <span className="font-bold text-custom-color">{score}</span> out of{' '}
          <span className="font-bold text-custom-color">
            {QUESTION_CONFIG.total}
          </span>
        </Text>
        <Text>
          You must score all questions correctly in order to retrieve your ice
          cream ticket. Click on the retry to button to try again or exit the
          platform.
        </Text>
      </div>
      <div className="flex align-middle justify-start mt-6 ml-6">
        <Button
          type="primary"
          onClick={() => {
            setShowScore(false);
            setScore(0);
          }}
          className="bg-custom-color hover:bg-hover-color"
        >
          Retry
        </Button>
        <Button
          type="default"
          onClick={() => {
            toast.success('Thank you for your participation.');
            window.location.reload();
          }}
          className="ml-2"
        >
          Exit
        </Button>
      </div>
    </div>
  );
}
