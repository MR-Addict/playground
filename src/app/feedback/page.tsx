import fetchFeedbacks from "./fetchFeedbacks";

export default async function Page() {
  const result = await fetchFeedbacks();
  console.log(result);

  return (
    <div className='frame w-full flex flex-col'>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-gray-700 font-bold'>Your Feedbacks</h1>
      </div>
    </div>
  );
}
