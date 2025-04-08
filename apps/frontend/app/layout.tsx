import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import { AppBar } from "./components/ui/AppBar";
import { ThemeProvider } from "./components/ui/Theme-Provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pin-up Time",
  description: "Pin-up Time Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider defaultTheme="dark" enableSystem forcedTheme="dark">
            {children}
          
          </ThemeProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
