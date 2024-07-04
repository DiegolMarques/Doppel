import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

import 'react-loading-skeleton/dist/skeleton.css';
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doppel",
  description: "Simulate conversations with Doppel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        'min-h-screen font-sans antialiased grainy',
        inter.className
      )}>
        <AuthProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}