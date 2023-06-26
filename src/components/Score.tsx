export default function Score({ score, questions }: any) {
  return (
    <div className="flex flex-col gap-y-5 align-middle justify-center bg-white p-6 shadow-xl rounded-md">
      <div className=" text-center">
        <p>You scored {score} out of 10</p>
      </div>
    </div>
  );
}
