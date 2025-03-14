'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/marketplace/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-2 px-4 flex items-center">
      {/* Logo for mobile */}
      <div className="md:hidden mr-3">
        <Link href="/marketplace">
          <Image
            src="/images/threefarmily3.png"
            alt="Logo"
            width={32}
            height={32}
          />
        </Link>
      </div>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 relative max-w-2xl">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search marketplace..."
            className="w-full p-2 pl-8 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <i className="ri-search-line absolute left-2.5 top-3 text-gray-500" aria-hidden="true"></i>
          <button 
            type="submit"
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </button>
        </div>
      </form>
      
      {/* Connect Wallet Button (mobile only) */}
      <div className="ml-3 md:hidden">
        <button className="flex items-center justify-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
          Connect
        </button>
      </div>
      
      {/* Additional header icons/buttons (notifications, etc.) */}
      <div className="hidden md:flex items-center ml-4">
        <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <i className="ri-notification-3-line text-xl" aria-hidden="true"></i>
        </button>
        <button className="p-2 ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <i className="ri-message-3-line text-xl" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
