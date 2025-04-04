import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Translate AI Lab",
  description: "Translate Georgian to English and English to Georgian with AI Lab",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
  </html>
);

export default RootLayout;
