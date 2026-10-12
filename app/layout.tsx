
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// @ts-ignore Next.js handles this stylesheet import at build time.
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
  title: "AI Diabetes Lifestyle Manager",
  description:
    "Personalized lifestyle, nutrition, and wellness guidance.",
  applicationName: "AI Diabetes Lifestyle Manager",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Diabetes Manager",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
