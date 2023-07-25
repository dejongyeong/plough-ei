'use client';

import React from 'react';
import { Button, Form, Input } from 'antd';
import { schema } from '@/lib/validations/schema';
import { LoadingOutlined } from '@ant-design/icons';
import { Toaster, toast } from 'sonner';
import { addUser } from '@/app/actions/user';

interface IProps {
  name: string;
  phone: string;
  email: string;
}

const yupSync = {
  async validator({ field }: any, value: any) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const message = 'Thank you for your participation. Have a nice day!';

export function Users({ score, setShowSVG }: any) {
  const [isPending, startTransition] = React.useTransition();

  const onFinish = ({ name, phone, email }: IProps) => {
    startTransition(async () => {
      try {
        await addUser({ name, phone, email });
        toast.success(message);

        setShowSVG(true);
      } catch (error) {
        toast.error('Something went wrong. Please reload and try again.');
      }
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="w-full flex flex-col gap-y-7 bg-white py-2">
        <div className="container mt-3">
          <Form name="basic" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Full Name" name="name" required rules={[yupSync]}>
              <Input placeholder="John Doe" />
            </Form.Item>

            <Form.Item label="Email" name="email" required rules={[yupSync]}>
              <Input placeholder="johndoe@gmail.com" />
            </Form.Item>

            <Form.Item label="Phone" name="phone" required rules={[yupSync]}>
              <Input placeholder="0834567223" />
            </Form.Item>

            <Form.Item>
              <Button type="default" htmlType="reset" disabled={isPending}>
                Clear
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isPending}
                className="ml-2 bg-custom-color hover:bg-hover-color"
              >
                {isPending && (
                  <LoadingOutlined
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                )}
                Submit
                <span className="sr-only">Submit</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
