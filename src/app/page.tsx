'use client';

import { Button } from 'antd';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-sky-700">
      <div className="max-[480px]:m-5 max-[768px]:w-11/12 max-[1024px]:w-4/5 min-[1025px]:w-2/4">
        <div className="mb-3 text-neutral-600">Question 1 of 5</div>
        <div className="flex flex-col gap-y-5 bg-white p-6 shadow-xl rounded-md">
          <div>
            <h1 className="text-2xl font-semibold">1. Question???</h1>
          </div>
          <div className="grid grid-cols-2 max-[480px]:grid-cols-1 gap-3">
            <div className="border-2 border-pink-500">Options</div>
            <div className="border-2 border-pink-500">Options</div>
            <div className="border-2 border-pink-500">Options</div>
            <div className="border-2 border-pink-500">Options</div>
          </div>
          <div className="flex flex-row gap-3 mt-4">
            <Button
              type="primary"
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              Previous
            </Button>
            <Button
              type="primary"
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
