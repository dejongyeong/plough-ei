import { v4 as uuidv4 } from 'uuid';
import { useQRCode } from 'next-qrcode';
import { Typography, Button } from 'antd';

import { QUESTION_CONFIG } from '@/lib/constant';

const success = 'Congratulations!';
const fail = 'Oops, please try again!';

const { Title, Text } = Typography;

export default function Score({ score }: any) {
  const { SVG } = useQRCode();
  const uuid = uuidv4();

  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      <div className="flex flex-col gap-y-2 text-center mt-2">
        <Title
          level={2}
          type={score >= QUESTION_CONFIG.minCorrect ? 'success' : 'danger'}
        >
          {score >= QUESTION_CONFIG.minCorrect ? success : fail}
        </Title>

        <Text type="secondary">
          Score: <span className="font-bold text-custom-color">{score}</span>{' '}
          out of{' '}
          <span className="font-bold text-custom-color">
            {QUESTION_CONFIG.total}
          </span>
        </Text>

        {score >= QUESTION_CONFIG.minCorrect ? (
          <>
            <Text>
              😊 Here is your ticket to the Ice Cream Robot 😊 <br />
              <span className="text-gray-500">
                Scan to retrieve your ice cream before pressing the restart
                button
              </span>
            </Text>
          </>
        ) : (
          <Text>
            😔 You must score <span className="font-semibold">at least 8</span>{' '}
            to get an ice cream 😔
          </Text>
        )}
      </div>

      {score >= QUESTION_CONFIG.minCorrect ? (
        <div className="flex align-middle justify-center">
          <SVG text={uuid} options={{ width: 240 }} />
        </div>
      ) : null}

      <div className="flex align-middle justify-center mt-4 ">
        <Button
          type="primary"
          onClick={() => window.location.reload()}
          className="bg-custom-color hover:bg-hover-color"
        >
          Restart
        </Button>
      </div>
    </div>
  );
}
