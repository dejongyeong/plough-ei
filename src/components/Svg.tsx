'use client';

import { v4 as uuidv4 } from 'uuid';
import { useQRCode } from 'next-qrcode';
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

export function Svg() {
  const { SVG } = useQRCode();
  const uuid = uuidv4();

  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      <div className="flex flex-col px-6 mt-2 space-y-2">
        <Title level={2} type="success">
          Here is your ticket 🍦
        </Title>
        <Text className="text-gray-500">
          Scan to retrieve your ice cream before pressing the restart button
        </Text>
        <div className="flex align-middle justify-center">
          <SVG text={uuid} options={{ width: 270 }} />
        </div>
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
    </div>
  );
}
