'use client';

import Link from 'next/link';
import { useWallet } from '@/contexts/WalletContext';

const mobileNavItems = [
  { name: 'Marketplace', href: '/marketplace', icon: 'shopping-bag' },
  { name: 'AI Chat', href: '/chat', icon: 'message' },
  { name: 'Equipment', href: '/equipment', icon: 'tool' },
  { name: 'Designs', href: '/designs', icon: 'layout' },
  { name: 'Profile', href: '/profile', icon: 'user' },
];

export default function MobileNavigation() {
  const { wallet } = useWallet();
  
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      {wallet.connected && (
        <div className="flex justify-center items-center p-1 bg-green-100 dark:bg-green-900/30">
          <i className="ri-wallet-3-line text-green-600 mr-1"></i>
          <span className="text-xs text-green-800 dark:text-green-300">
            {`${wallet.address?.slice(0, 4)}...${wallet.address?.slice(-4)}`} • Flare
          </span>
        </div>
      )}
      <div className="flex justify-around px-2 py-3">
        {mobileNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-16"
          >
            <i className={`ri-${item.icon}-line text-xl`} aria-hidden="true"></i>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
