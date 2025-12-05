import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Gift Finder | Find Thoughtful Gifts in Seconds",
  description:
    "Describe who you're buying for and let AI suggest personal, on-budget gift ideas. The smartest way to find the perfect gift.",
  keywords: [
    "gift finder",
    "AI gifts",
    "personalized gifts",
    "gift suggestions",
    "gift ideas",
    "thoughtful gifts",
    "budget gifts",
  ],
  authors: [{ name: "AI Gift Finder" }],
  creator: "AI Gift Finder",
  openGraph: {
    title: "AI Gift Finder | Find Thoughtful Gifts in Seconds",
    description:
      "Describe who you're buying for and let AI suggest personal, on-budget gift ideas.",
    type: "website",
    locale: "en_US",
    siteName: "AI Gift Finder",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Gift Finder | Find Thoughtful Gifts in Seconds",
    description:
      "Describe who you're buying for and let AI suggest personal, on-budget gift ideas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body className="font-satoshi antialiased">{children}</body>
    </html>
  );
}
