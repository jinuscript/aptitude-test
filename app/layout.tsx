import type { Metadata } from "next";
import localFont from 'next/font/local'
import "@/shared/styles/globals.css";
import TanstackQueryProvider from "@/shared/provider/TanstackQueryProvider";
import NavigationBar from "@/widget/NavigationBar/ui/NavigationBar";

export const metadata: Metadata = {
  title: "AI 적성검사",
  description: "AI 적성검사",
};

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-pretendard">
        <TanstackQueryProvider>
          <NavigationBar />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
