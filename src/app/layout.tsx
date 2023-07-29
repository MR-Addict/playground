import "./globals.css";

import { Suspense } from "react";

import { ScrollToTop } from "@/components/client";
import { Footer, Navbar } from "@/components/server";
import { NextauthProvider, PopupContextProvider, LoginContextProvider, ProgressbarContextProvider } from "@/contexts";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="background min-h-screen flex flex-col items-center justify-between">
        <Suspense>
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
        </Suspense>
      </body>
    </html>
  );
}
