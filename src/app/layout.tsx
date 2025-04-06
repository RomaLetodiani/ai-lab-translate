import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header";
import { LanguageProvider } from "@/contexts/lang.context";
import { ServiceWorkerRegistration } from "@/workers/service-worker-registration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "Translate AI Lab";
const APP_TITLE_TEMPLATE = "%s - Translate AI Lab";
const APP_DESCRIPTION = "Translate Georgian to English and English to Georgian with AI Lab";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
      <ServiceWorkerRegistration />
      <div className="flex flex-col min-h-screen">
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </div>
    </body>
  </html>
);

export default RootLayout;
