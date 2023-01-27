import "./globals.css";
import { NextauthProvider, ScrollToTop, PopupContextProvider, Footer, Navbar } from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh'>
      <head />
      <body className='min-h-screen background flex flex-col items-center justify-between'>
        <NextauthProvider>
          <PopupContextProvider>
            {/* @ts-expect-error */}
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </PopupContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
