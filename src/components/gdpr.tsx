'use client';

import * as React from 'react';
import { schema } from '@/lib/validations/schema';
import { LoadingOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import {
  Button,
  Form,
  Switch,
  Input,
  Radio,
  Space,
  Checkbox,
  Popconfirm,
} from 'antd';
import Link from 'next/link';
import { toast } from 'sonner';
import { addUser } from '@/app/actions/user';

const { Text } = Typography;

const yupSync = {
  async validator({ field }: any, value: any) {
    await schema.validateSyncAt(field, { [field]: value });
  },
};

interface GdprProps {
  setShowSvg: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Gdpr({ setShowSvg }: GdprProps) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = React.useTransition();

  const onFinish = (data: any) => {
    startTransition(async () => {
      try {
        await addUser({ ...data });

        toast.success(`Thank you for your participation. Have a nice day!`);

        // set cookie so that for user who want to try again
        // we doesn't have to save the data again
        localStorage.setItem('plough-ei', JSON.stringify({ quiz: true }));

        setShowSvg(true);
      } catch (error) {
        toast.error('Something went wrong. Please reload and try again.');
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-y-4 p-6 bg-white shadow-xl rounded-md">
      <Text strong>Please fill in the form below:</Text>
      <Form
        form={form}
        name="gdpr"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          isMember: false,
          isInterested: true,
          agree: true,
        }}
      >
        <Form.Item label="Full Name" name="name" required rules={[yupSync]}>
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item label="Email" name="email" required rules={[yupSync]}>
          <Input placeholder="johndoe@gmail.com" />
        </Form.Item>

        <Form.Item label="I am a:" name="job" required rules={[yupSync]}>
          <Radio.Group>
            <Space direction="vertical">
              <Radio value={'third level engineering student'}>
                Third-Level Engineering Student
              </Radio>
              <Radio value={'professional'}>Professional</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <div className="flex gap-3 items-center justify-between mb-0.5 mt-3">
          <Text>I am currently a member of Engineers Ireland: </Text>
          <Form.Item
            className="m-0"
            name="isMember"
            required
            valuePropName="checked"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              className="bg-custom-color hover:bg-hover-color"
            />
          </Form.Item>
        </div>

        <div className="mt-0.5 flex gap-3 items-center justify-between">
          <Text>
            I am interested in becoming a member of Engineers Ireland:{' '}
          </Text>
          <Form.Item
            name="isInterested"
            required
            valuePropName="checked"
            className="m-0"
          >
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              className="bg-custom-color hover:bg-hover-color"
            />
          </Form.Item>
        </div>

        <div className="flex gap-4 items-start justify-between mt-4 mb-2">
          <Form.Item
            name="agree"
            valuePropName="checked"
            required
            rules={[yupSync]}
          >
            <Checkbox />
          </Form.Item>
          <Text>
            I agree to receive future communication from Engineers Ireland in
            relation to their services:
          </Text>
        </div>

        <Form.Item>
          <Text className="!leading-relaxed">
            If you would like to withdraw your consent, please contact Engineers
            Ireland via{' '}
            <Link
              href="https://www.engineersireland.ie/Privacy-Policy"
              target="_blank"
            >
              Engineers Ireland Privacy Notice
            </Link>
            . You can also learn more about how you protect your personal data
            and how you can exercise your rights here:{' '}
            <Link
              href="https://www.engineersireland.ie/Privacy-Policy"
              target="_blank"
            >
              https://www.engineersireland.ie/Privacy-Policy
            </Link>
            .
          </Text>
        </Form.Item>

        <Form.Item>
          <Popconfirm
            title="Quit Quiz"
            description="Are you sure to cancel this quiz?"
            placement="bottomLeft"
            okButtonProps={{
              className: 'bg-red-600 hover:!bg-red-500 mt-1.5',
            }}
            onConfirm={() => window.location.reload()}
          >
            <Button type="default" htmlType="button" className="mr-2">
              Cancel
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            htmlType="submit"
            disabled={isPending}
            className="bg-custom-color hover:bg-hover-color"
          >
            {isPending && (
              <LoadingOutlined className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {isPending ? 'Submitting' : 'Submit'}
            <span className="sr-only">Submit</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
