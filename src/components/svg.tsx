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
    <div className="w-full flex flex-col gap-y-2 bg-white p-6 shadow-xl rounded-md text-center">
      {coupon ? (
        <div className="flex flex-col px-6 mt-2 space-y-2">
          <Title level={3} type="success">
            Congratulations!🎉
          </Title>
          <Text>
            Here is your ticket. Please scan this QR code to retrieve your ice
            cream🍦before clicking on the exit button.
          </Text>
          <div className="flex align-middle justify-center">
            <SVG text={code} options={{ width: 270 }} />
          </div>
          <Text className="text-blue-500 mt-3">Have a nice day!</Text>
          <div className="flex align-middle justify-center">
            <Button
              type="default"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Exit
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
        <Title level={3} type="danger">
          Application Error
        </Title>
        <Text>
          We are unable to generate the QR code due to the application error.
          Unfortunately, we would have to reload the application. Please click
          on the reload button and we will refresh the application and try
          again.
        </Text>
      </div>
      <div className="flex align-middle justify-center mt-4 ">
        <Button
          type="primary"
          onClick={() => window.location.reload()}
          className="bg-custom-color hover:bg-hover-color"
        >
          Reload
        </Button>
      </div>
    </div>
  );
}
