import "./globals.css";

import Script from "next/script";
import { ScrollToTop } from "@/components/client";
import { Footer, Navbar } from "@/components/server";
import { NextauthProvider, PopupContextProvider, LoginContextProvider, ProgressbarContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="background min-h-screen flex flex-col items-center justify-between">
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
      <Script async src="https://umami.mraddict.one/script.js" data-website-id="6d377f25-c6bd-458d-8c65-ffeb3f4a7b36" />
    </html>
  );
}
