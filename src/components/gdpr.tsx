'use client';

import * as React from 'react';
import { schema } from '@/lib/validations/schema';
import { LoadingOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button, Form, Switch, Input, Radio, Space, Checkbox } from 'antd';
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
  setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Gdpr({ setShowQuestion }: GdprProps) {
  const [form] = Form.useForm();
  const [isPending, startTransition] = React.useTransition();

  const onFinish = (data: any) => {
    startTransition(async () => {
      try {
        await addUser({ ...data });

        toast.success(`Let's quiz`);

        // set cookie so that for user who want to try again
        // we doesn't have to save the data again
        localStorage.setItem('plough-ei', JSON.stringify({ quiz: true }));

        setShowQuestion(true);
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

        <Form.Item label="I am a/an:" name="job" required rules={[yupSync]}>
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

        <div className="my-3">
          <Text>
            By entering this competition, I agree to be contacted by Engineers
            Ireland to receive a QR code to allow me to avail of my prize. This
            data will be processed only for the purposes of the competition and
            not further processed. The data will be deleted one month after the
            competition ends unless you express below your desire to receive
            further communication from Engineers Ireland by providing your
            consent. I understand that I can learn more about how you protect my
            personal data and how I can exercise my rights on{' '}
            <Link
              href="https://www.engineersireland.ie/Privacy-Policy"
              target="_blank"
            >
              https://www.engineersireland.ie/Privacy-Policy
            </Link>
            .
          </Text>
        </div>

        <div className="flex gap-3 items-start justify-between my-1">
          <Form.Item
            name="agree"
            valuePropName="checked"
            required
            rules={[yupSync]}
          >
            <Checkbox />
          </Form.Item>
          <Text strong>
            I agree to receive future communication from Engineers Ireland in
            relation to their services:
          </Text>
        </div>

        <Form.Item>
          <Text>
            If I would like to withdraw my consent for the above, I can let
            Engineers Ireland know by contacting you using the contact
            information in the{' '}
            <Link
              href="https://www.engineersireland.ie/Privacy-Policy"
              target="_blank"
            >
              Engineers Ireland Privacy Notice
            </Link>
            .
          </Text>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="button"
            className="mr-2"
            onClick={() => window.location.reload()}
          >
            Cancel
          </Button>
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
