import "./globals.css";
import {
  NextauthProvider,
  ScrollToTop,
  PopupContextProvider,
  LoginContextProvider,
  Footer,
  Navbar,
} from "@/components";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head />
      <body style={{ minHeight: "100vh" }} className='background flex flex-col items-center justify-between'>
        <NextauthProvider>
          <PopupContextProvider>
            <LoginContextProvider>
              {/* @ts-expect-error */}
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
