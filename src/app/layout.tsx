import "./globals.css";

import { env } from "@/types/env";
import { ScrollToTop, Footer, Navbar } from "@/components";
import { NextauthProvider, PopupContextProvider, LoginContextProvider, CronitorProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='background min-h-screen flex flex-col items-center justify-between'>
        <CronitorProvider cronitorToken={env.CRONITOR_TOKEN}>
          <NextauthProvider>
            <PopupContextProvider>
              <LoginContextProvider>
                <Navbar />
                {children}
                <Footer />
                <ScrollToTop />
              </LoginContextProvider>
            </PopupContextProvider>
          </NextauthProvider>
        </CronitorProvider>
      </body>
    </html>
  );
}
