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
}

const yupSync = {
  async validator({ field }: any, value: any) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

const message = 'Thank you for your participation. Have a nice day!';

export function Users({ setShowScore, setShowForm }: any) {
  const [isPending, startTransition] = React.useTransition();

  const onFinish = ({ name, phone }: IProps) => {
    startTransition(async () => {
      try {
        await addUser({ name, phone });
        toast.success(message);

        setShowScore(true);
        setShowForm(false);
      } catch (error) {
        toast.error('Something went wrong. Please reload and try again.');
      }
    });
  };

  return (
    <>
      <Toaster richColors />
      <div className="w-full flex flex-col gap-y-7 bg-white p-6 shadow-xl rounded-md">
        <div className="">Please enter your name and phone below:</div>
        <div className="container">
          <Form name="basic" layout="vertical" onFinish={onFinish}>
            <Form.Item label="Full Name" name="name" required rules={[yupSync]}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone" required rules={[yupSync]}>
              <Input />
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
