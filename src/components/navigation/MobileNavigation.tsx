import Link from 'next/link';
import Image from 'next/image';

const mobileNavItems = [
  { name: 'Home', href: '/', icon: '/home.svg' },
  { name: 'Marketplace', href: '/marketplace', icon: '/marketplace.svg' },
  { name: 'Produce', href: '/produce', icon: '/produce.svg' },
  { name: 'Chat', href: '/chat', icon: '/chat.svg' },
  { name: 'Profile', href: '/profile', icon: '/user.svg' },
];

export default function MobileNavigation() {
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around px-2 py-3">
        {mobileNavItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center justify-center w-16"
          >
            <Image
              src={item.icon}
              alt={item.name}
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
