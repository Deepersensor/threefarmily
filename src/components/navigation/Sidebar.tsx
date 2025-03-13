import Link from 'next/link';
import Image from 'next/image';

const navigationItems = [
  { name: 'Marketplace', href: '/marketplace', icon: '/marketplace.svg' },
  { name: 'Fresh Produce', href: '/produce', icon: '/produce.svg' },
  { name: 'Equipment', href: '/equipment', icon: '/equipment.svg' },
  { name: 'AI Solutions', href: '/ai-solutions', icon: '/robot.svg' },
  { name: 'Farm Designs', href: '/designs', icon: '/designs.svg' },
  { name: 'Community', href: '/community', icon: '/community.svg' },
  { name: 'Wallet', href: '/wallet', icon: '/wallet.svg' },
  { name: 'Chat', href: '/chat', icon: '/chat.svg' },
  { name: 'Settings', href: '/settings', icon: '/settings.svg' },
];

export default function Sidebar() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="dark:invert"
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
            <Image
              src={item.icon}
              alt={item.name}
              width={20}
              height={20}
              className="dark:invert"
            />
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
