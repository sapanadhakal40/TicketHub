import type { Metadata } from "next";
import { Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Nav from "./(components)/nav";
import { ThemeProvider } from "next-themes";
import {Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
 });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticket App",
  description: "Generated by Sapana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} `}
      >
        <ThemeProvider enableSystem={true} defaultTheme="system" attribute="class">
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-grow">{children}</main>
            <Toaster position="bottom-right" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
