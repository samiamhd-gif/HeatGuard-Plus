import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeatGuard+",
  description: "Solar-powered wearable heat stress monitor for delivery riders",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HeatGuard+",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0396fd",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body className="bg-slate-50 text-slate-900 font-sans">{children}</body>
    </html>
  );
}
