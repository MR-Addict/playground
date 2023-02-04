import { Capture, Result, CaptureContextProvider } from "./components";

export default function Page() {
  return (
    <main aria-label='website capture' className='frame w-full flex flex-col items-center gap-5'>
      <header className='text-3xl text-center text-gray-700 font-bold'>Website Capture</header>
      <CaptureContextProvider>
        <Capture />
        <Result />
      </CaptureContextProvider>
    </main>
  );
}
