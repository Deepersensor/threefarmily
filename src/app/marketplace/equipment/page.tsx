import { equipmentItems } from '@/data/marketplace';
import MarketplaceLayout from '../layout';
import Link from 'next/link';

export default function EquipmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Farm Equipment</h1>
        <Link href="/marketplace" className="text-green-600 hover:text-green-700">
          Back to Marketplace
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add equipment items grid here similar to marketplace page */}
      </div>
    </div>
  );
}
