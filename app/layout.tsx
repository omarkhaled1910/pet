import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Pet Store",
  description: "Pet Store",
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
        <Toaster position="top-right" reverseOrder={false} />{" "}
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NuqsAdapter>{children}</NuqsAdapter>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
