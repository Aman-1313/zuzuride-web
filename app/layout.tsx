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
  title: "Zuzuride - Affordable Carpooling in Alberta",
  description:
    "Zuzuride connects riders and drivers for affordable carpooling between cities like Red Deer, Calgary, and Edmonton. Skip the drive, save money, and ride smart.",
  metadataBase: new URL("https://zuzuride.com"),
  openGraph: {
    title: "Zuzuride - Carpool Smarter",
    description:
      "Get rides between Red Deer, Calgary, and Edmonton for as low as $10 with Zuzuride's safe and reliable carpooling platform.",
    url: "https://zuzuride.com",
    siteName: "Zuzuride",
    images: [
      {
        url: "/og-image.png", // optional: add an image at public/og-image.png
        width: 1200,
        height: 630,
        alt: "Zuzuride Carpooling",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuzuride - Carpool Smarter",
    description:
      "Skip expensive buses—ride with locals instead. Safe, affordable, and social carpooling across Alberta.",
    site: "@zuzuride",
  },
  icons: {
      icon: "/og-image.png", // or "/favicon.png"
      shortcut: "/og-image.png",
      apple: "/og-image.png", // optional, for iOS homescreen
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
