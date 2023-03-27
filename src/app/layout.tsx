import "./globals.css";

import { ScrollToTop, Footer, Navbar } from "@/components";
import { NextauthProvider, PopupContextProvider, LoginContextProvider, CronitorContext } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body style={{ minHeight: "100vh" }} className='background flex flex-col items-center justify-between'>
        <CronitorContext cronitorToken={process.env.CRONITOR_TOKEN}>
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
        </CronitorContext>
      </body>
    </html>
  );
}
