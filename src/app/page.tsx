'use client';

import { Button, Radio } from 'antd';
import { useState } from 'react';

import questions from '../lib/questions.json';

export default function Home() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected]: any = useState([]);

  const handlePrevious = () => {
    const prevQ = currentQ - 1;
    prevQ >= 0 && setCurrentQ(prevQ);
  };

  const handleNext = () => {
    const nextQ = currentQ + 1;
    nextQ < questions.length && setCurrentQ(nextQ);
  };

  const handleOptions = (event: any) => {
    const { value } = event.target;
    setSelected([(selected[currentQ] = { answerByUser: value })]);
    setSelected([...selected]);
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-sky-100 to-sky-700">
      <div className="max-[480px]:m-5 max-[768px]:w-11/12 max-[1024px]:w-4/5 min-[1025px]:w-2/4">
        <div className="mb-3 text-neutral-600 text-sm">
          Question {currentQ + 1} of {questions.length}.
        </div>
        <div className="flex flex-col gap-y-5 bg-white p-6 shadow-xl rounded-md">
          <div>
            <h1 className="text-xl font-semibold">
              {questions[currentQ].question}
            </h1>
          </div>
          <Radio.Group
            className="w-full grid grid-cols-2 max-[480px]:grid-cols-1 gap-3"
            value={selected[currentQ]?.answerByUser || undefined}
            onChange={handleOptions}
          >
            {questions[currentQ].answerOptions.map((answer, index) => (
              <Radio key={index} name={answer.answer} value={answer.answer}>
                {answer.answer}
              </Radio>
            ))}
          </Radio.Group>
          <div className="flex flex-row gap-3 mt-4 max-[425px]:flex-col">
            <Button
              type="primary"
              onClick={handlePrevious}
              disabled={currentQ === 0 ? true : false}
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              Previous
            </Button>
            <Button
              type="primary"
              className="w-full bg-custom-color hover:bg-hover-color"
              disabled={currentQ + 1 < questions.length ? false : true}
              onClick={handleNext}
            >
              Next
            </Button>
            {selected.length === questions.length ? (
              <Button
                type="primary"
                className="w-full bg-custom-color hover:bg-hover-color max-[425px]:mt-4"
              >
                Submit
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
