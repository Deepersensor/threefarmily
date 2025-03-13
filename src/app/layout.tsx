import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/navigation/Sidebar";
import MobileNavigation from "../components/navigation/MobileNavigation";
import TopBar from "../components/navigation/TopBar";
import AIHelper from "../components/ai/AIHelper";
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
  title: "Global AI Web3 Farming Marketplace",
  description: "A global marketplace connecting farmers, engineers, architects, and consumers in the web3 era.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add Remixicon for icons */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-screen">
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Bar with Search */}
            <TopBar />
            
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
              {children}
            </main>
            
            {/* AI Helper floating button */}
            <div className="fixed bottom-20 right-4 md:bottom-4 z-40">
              <AIHelper />
            </div>
            
            {/* Mobile Navigation - only visible on mobile */}
            <div className="fixed bottom-0 left-0 right-0 md:hidden z-30">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
