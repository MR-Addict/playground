import Platform from "./Platform";
import LastUpdate from "./LastUpdate";
import CopyrightYear from "./CopyrightYear";

export default async function Copyright() {
  return (
    <div className='text-gray-700 w-full flex flex-col md:flex-row justify-between gap-2'>
      <div className='flex flex-col md:flex-row gap-1 md:gap-2'>
        <CopyrightYear />
        {/* @ts-expect-error */}
        <LastUpdate />
        <Platform />
      </div>
    </div>
  );
}
