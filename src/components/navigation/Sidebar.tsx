'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@/contexts/WalletContext';

const navigationItems = [
  { 
    name: 'Marketplace', 
    href: '/marketplace', 
    icon: 'shopping-bag' 
  },
  { 
    name: 'AI Chat', 
    href: '/chat', 
    icon: 'message' 
  },
  { 
    name: 'Equipment', 
    href: '/equipment', 
    icon: 'tool' 
  },
  { 
    name: 'Farm Designs', 
    href: '/designs', 
    icon: 'layout' 
  },
  { 
    name: 'Profile', 
    href: '/profile', 
    icon: 'user' 
  },
];

export default function Sidebar() {
  const { wallet, connecting, connectWallet, disconnectWallet } = useWallet();
  
  const formatAddress = (address: string) => {
    return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/marketplace" className="flex items-center">
          <Image
            src="/images/threefarmily3.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <span className="ml-2 text-lg font-bold">FarmChain</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-3 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <i className={`ri-${item.icon}-line text-xl`} aria-hidden="true"></i>
            <span className="ml-3">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {wallet.connected ? (
          <div className="space-y-2">
            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center text-sm">
                <i className="ri-wallet-3-line mr-2 text-green-500"></i>
                <span className="font-medium truncate">{formatAddress(wallet.address)}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Flare Network (Chain ID: {wallet.chainId})
              </div>
            </div>
            <button
              onClick={disconnectWallet}
              className="w-full flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            {connecting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Connecting...
              </>
            ) : (
              <>
                <i className="ri-wallet-3-line mr-2"></i>
                Connect Wallet
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
