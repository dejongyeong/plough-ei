'use client';

import { Typography, Button } from 'antd';
import { QUESTION_CONFIG } from '@/lib/constant';
import { toast } from 'sonner';

const { Title, Text } = Typography;

interface IProps {
  score: number;
}

export function Incorrect({ score }: IProps) {
  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      <div className="flex flex-col px-6 mt-2 space-y-2">
        <Title level={2} type="danger">
          Please try again! 😔
        </Title>
        <Text type="secondary">
          You score:{' '}
          <span className="font-bold text-custom-color">{score}</span> out of{' '}
          <span className="font-bold text-custom-color">
            {QUESTION_CONFIG.total}
          </span>
        </Text>
        <Text>
          You must score{' '}
          <span className="font-semibold">
            at least {QUESTION_CONFIG.minCorrect}
          </span>{' '}
          to get a ticket to the ice cream. Please try again.
        </Text>
      </div>
      <div className="flex align-middle justify-start mt-6 ml-6">
        <Button
          type="primary"
          onClick={() => {
            toast.success('Thank you for your participation.');
            window.location.reload();
          }}
          className="bg-custom-color hover:bg-hover-color"
        >
          Restart
        </Button>
      </div>
    </div>
  );
}
