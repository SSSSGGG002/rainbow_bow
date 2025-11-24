import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rainbow Bridge | 彩虹桥信箱",
  description: "A space to remember and connect with your beloved pets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
