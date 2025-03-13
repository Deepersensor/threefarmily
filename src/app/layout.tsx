import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../components/navigation/Sidebar";
import MobileNavigation from "../components/navigation/MobileNavigation";
import TopBar from "../components/navigation/TopBar";ar";
import AIHelper from "../components/ai/AIHelper";./components/ai/AIHelper";
import "./globals.css";import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",eist-sans",
  subsets: ["latin"],ubsets: ["latin"],
});});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",eist-mono",
  subsets: ["latin"],ubsets: ["latin"],
});});

export const metadata: Metadata = {
  title: "Global AI Web3 Farming Marketplace",al AI Web3 Farming Marketplace",
  description:
    "A global marketplace connecting farmers, engineers, architects, and consumers in the web3 era.",  "A global marketplace connecting farmers, engineers, architects, and consumers in the web3 era.",
};};

export default function RootLayout({ult function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;ldren: React.ReactNode;
}>) {
  return (
    <html lang="en">ang="en">
      <head>
        {/* Add Remixicon for icons */} className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}e="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      >ebar />
        <div className="flex h-screen"></div>
          {/* Desktop Sidebar - hidden on mobile */}
          <div className="hidden md:block w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
            <Sidebar />
          </div>with Search */}
           />
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">y-auto pb-16 md:pb-0">
            {/* Top Bar with Search */}
            <TopBar />
            
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{/* AI Helper floating button */}
              {children}4 z-40">
            </main>
            
            {/* AI Helper floating button */}
            <div className="fixed bottom-20 right-4 md:bottom-4 z-40">Mobile Navigation - only visible on mobile */}
              <AIHelper />iv className="fixed bottom-0 left-0 right-0 md:hidden z-30">
            </div> <MobileNavigation />
             </div>
            {/* Mobile Navigation - only visible on mobile */}      </div>
            <div className="fixed bottom-0 left-0 right-0 md:hidden z-30">       </div>
              <MobileNavigation />      </body>








}  );    </html>      </body>        </div>          </div>            </div>    </html>
  );
}
