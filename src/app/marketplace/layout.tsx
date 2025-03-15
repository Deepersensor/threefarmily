import { ReactNode } from 'react';

export default function MarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
    </main>
  );
}
