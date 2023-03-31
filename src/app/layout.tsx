import "./globals.css";

import { env } from "@/types/env";
import { ScrollToTop, Footer, Navbar, Cronitor } from "@/components";
import { NextauthProvider, PopupContextProvider, LoginContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body className='background min-h-screen flex flex-col items-center justify-between'>
        <Cronitor cronitorToken={env.CRONITOR_TOKEN} />
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
      </body>
    </html>
  );
}
