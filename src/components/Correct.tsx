'use client';

import { Typography, Button } from 'antd';
import { QUESTION_CONFIG } from '@/lib/constant';
import { Users } from './Users';

const { Title, Text } = Typography;

interface IProps {
  score: number;
  setShowSVG: any;
}

export function Correct({ score, setShowSVG }: IProps) {
  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      <div className="flex flex-col px-6 mt-2 space-y-2">
        <Title level={2} type="success">
          Congratulations 😊
        </Title>
        <Text type="secondary">
          You score:{' '}
          <span className="font-bold text-custom-color">{score}</span> out of{' '}
          <span className="font-bold text-custom-color">
            {QUESTION_CONFIG.total}
          </span>
        </Text>
        <Text className="text-gray-500 mt-2">
          Please enter your details to retrieve your ticket to the ice cream
          robot.
        </Text>
        <Users setShowSVG={setShowSVG} />
      </div>
    </div>
  );
}
