import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback Platform",
  description: "Share your feedback with us",
  icons: {
    icon: [
      {
        url: "/ic2.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/ic.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/in.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
