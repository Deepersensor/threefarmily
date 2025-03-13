import Link from 'next/link';

const mobileNavItems = [
  { name: 'Marketplace', href: '/marketplace', icon: 'shopping-bag' },
  { name: 'Produce', href: '/produce', icon: 'leaf' },
  { name: 'Equipment', href: '/equipment', icon: 'tool' },
  { name: 'Designs', href: '/designs', icon: 'layout' },
  { name: 'Profile', href: '/profile', icon: 'user' },
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
            <i className={`ri-${item.icon}-line text-xl`} aria-hidden="true"></i>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
