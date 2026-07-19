import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "StadiumMind AI — FIFA World Cup 2026",
    template: "%s | StadiumMind AI",
  },
  description:
    "AI Operating System for Smart Stadiums & Tournament Operations. Powering FIFA World Cup 2026 with intelligent crowd management, navigation, emergency response, and more.",
  keywords: [
    "FIFA World Cup 2026",
    "stadium AI",
    "crowd management",
    "smart stadium",
    "tournament operations",
    "emergency response",
    "AI navigation",
  ],
  authors: [{ name: "StadiumMind AI Team" }],
  creator: "StadiumMind AI",
  publisher: "StadiumMind AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "StadiumMind AI — FIFA World Cup 2026",
    description: "AI Operating System for Smart Stadiums & Tournament Operations",
    siteName: "StadiumMind AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "StadiumMind AI",
    description: "AI Operating System for Smart Stadiums & Tournament Operations",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a1a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "rgba(10,14,26,0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                backdropFilter: "blur(12px)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
