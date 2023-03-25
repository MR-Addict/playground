import { Back } from "../components";
import { setMetadata } from "@/lib/utils";
import { Capture, Result, CaptureContextProvider } from "./components";

export const metadata = setMetadata("Tools • Capture Website");

export default function Page() {
  return (
    <main
      aria-label='website capture page'
      className='frame w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-5 md:gap-10'
    >
      <Back />
      <CaptureContextProvider>
        <div className='w-full flex flex-col items-center gap-5'>
          <header className='text-3xl text-center text-gray-700 font-bold'>Capture Website</header>
          <Capture />
          <Result />
        </div>
      </CaptureContextProvider>
      <span></span>
    </main>
  );
}
