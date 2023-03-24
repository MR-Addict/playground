import { getMetadata } from "@/lib/utils";
import { Capture, Result, CaptureContextProvider } from "./components";

export const metadata = getMetadata("Capture Website • Tools");

export default function Page() {
  return (
    <main aria-label='website capture page' className='frame w-full flex flex-col items-center gap-5'>
      <header className='text-3xl text-center text-gray-700 font-bold'>Capture Website</header>
      <CaptureContextProvider>
        <Capture />
        <Result />
      </CaptureContextProvider>
    </main>
  );
}
