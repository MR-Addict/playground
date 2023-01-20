import { FeedbackForm } from "@/components";

export default function Feedback() {
  return (
    <div className='py-16 md:py-24 px-5 md:px-48 w-full flex flex-col items-center gap-10'>
      <h1 className='text-gray-700 font-bold text-3xl md:text-5xl text-center'>Leave your opinion</h1>
      <p className='w-full max-w-xl text-xl text-center'>
        Tell me what do you think after visit my playground. I'm open to your thoughts!
      </p>
      <div className='w-full max-w-xl'>
        <FeedbackForm />
      </div>
    </div>
  );
}
