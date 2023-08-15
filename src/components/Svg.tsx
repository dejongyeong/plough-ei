'use client';

import { useSearchParams } from 'next/navigation';
import { useQRCode } from 'next-qrcode';
import { Typography, Button } from 'antd';

const { Title, Text } = Typography;

export function Svg({ pathname }: { pathname: string }) {
  const { SVG } = useQRCode();

  const searchParams = useSearchParams();
  const coupon = searchParams.get('coupon') as string;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const code = `${appUrl}${pathname}?coupon=${coupon}`;

  return (
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md">
      {coupon ? (
        <div className="flex flex-col px-6 mt-2 space-y-2">
          <Title level={2} type="success">
            Here is your ticket 🍦
          </Title>
          <Text className="text-gray-500">
            Scan to retrieve your ice cream before pressing the restart button
          </Text>
          <div className="flex align-middle justify-center">
            <SVG text={code} options={{ width: 270 }} />
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
      ) : (
        <Error />
      )}
    </div>
  );
}

function Error() {
  return (
    <div className="flex flex-col px-6 mt-2 space-y-2">
      <div className="mb-5">
        <Title level={2} type="danger">
          Error
        </Title>
        <Text className="text-gray-500">
          We are unable to generate the QR code due to the application error.
          Please Try again.
        </Text>
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
  );
}
