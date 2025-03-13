import Link from 'next/link';
import Image from 'next/image';

const navigationItems = [
  { name: 'Marketplace', href: '/marketplace', icon: 'shopping-bag' },
  { name: 'Fresh Produce', href: '/produce', icon: 'leaf' },
  { name: 'Equipment', href: '/equipment', icon: 'tool' },
  { name: 'Farm Designs', href: '/designs', icon: 'layout' },
  { name: 'Profile', href: '/profile', icon: 'user' },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/marketplace" className="flex items-center">
          <Image
            src="/images/logo.png"
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
        <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
