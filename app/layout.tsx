import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import TanstackQueryProvider from "@/shared/provider/TanstackQueryProvider";

export const metadata: Metadata = {
  title: "AI 적성검사",
  description: "AI 적성검사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TanstackQueryProvider>
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
