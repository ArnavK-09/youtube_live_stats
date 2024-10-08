import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export const viewport: Viewport = {
  themeColor: "#ff0000",
};

const siteTitle = "Youtube Realtime Stats!!!!...";
const siteDescription = `Welcome to **YouTube Live Stats**! This project is designed to provide real-time statistics for YouTube channels, including total video views, subscribers, and live graphs of these metrics. With an easy-to-use interface, users can simply enter a YouTube channel handle to view live statistics and track their performance over time.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://github.com/ArnavK-09"),
  title: siteTitle,
  description: siteDescription,
  icons: "/logo.png",
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/ArnavK-09",
    creator: "arnavkaushal09@gmail.com",
    images: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://github.com/ArnavK-09",
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#ffeae0] overflow-x-hidden">
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <link
          rel="preload"
          href="/fonts/Mincraft-Bold.otf"
          as="font"
          type="font/opentype"
        />
        <link
          rel="preload"
          href="/fonts/Mincraft.otf"
          as="font"
          type="font/opentype"
        />
      </Head>
      <body className="min-h-screen overflow-x-hidden word-break">
        <header className="w-screen flex justify-center align-center">
          <Navbar />
        </header>
        <main className="min-h-screen my-40 w-screen overflow-x-hidden grid place-items-center text-center">
          {children}
        </main>
      </body>
    </html>
  );
}
