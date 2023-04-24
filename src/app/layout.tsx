import "./globals.css";

import { env } from "@/types/env";
import { Footer, Navbar } from "@/components/server";
import { ScrollToTop, Cronitor, VercelAnalytics } from "@/components/client";
import { NextauthProvider, PopupContextProvider, LoginContextProvider, ProgressbarContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='background min-h-screen flex flex-col items-center justify-between'>
        <Cronitor cronitorToken={env.CRONITOR_TOKEN} />
        <VercelAnalytics />
        <NextauthProvider>
          <PopupContextProvider>
            <LoginContextProvider>
              <ProgressbarContextProvider>
                <Navbar />
                {children}
                <Footer />
                <ScrollToTop />
              </ProgressbarContextProvider>
            </LoginContextProvider>
          </PopupContextProvider>
        </NextauthProvider>
      </body>
    </html>
  );
}
