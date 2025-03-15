'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import WalletBanner from '@/components/wallet/WalletBanner';
import { MarketplaceItem, equipmentItems, aiSolutionsItems, designItems } from '@/data/marketplace';
import BuyItemButton from '@/components/marketplace/BuyItemButton';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<MarketplaceItem[]>([]);
  
  useEffect(() => {
    // Combine all items
    const allItems = [...equipmentItems, ...aiSolutionsItems, ...designItems];
    
    // Filter items based on search query
    const filtered = allItems.filter(item => {
      const searchStr = `${item.name} ${item.description} ${item.seller} ${item.location}`.toLowerCase();
      return searchStr.includes(query.toLowerCase());
    });
    
    setResults(filtered);
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 md:mb-0">Search Results</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Found {results.length} items for "{query}"
          </p>
        </div>
        <Link href="/marketplace" className="flex items-center gap-1 text-sm mt-2 md:mt-0">
          <i className="ri-arrow-left-line" aria-hidden="true"></i>
          Back to Marketplace
        </Link>
      </div>
      
      <WalletBanner />
      
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {results.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-40 ${item.color} flex items-center justify-center relative`}>
                <i className={`ri-${item.icon} text-5xl ${item.iconColor}`} aria-hidden="true"></i>
                {item.verified && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <i className="ri-check-line mr-1" aria-hidden="true"></i> Verified
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-green-600 font-bold mt-1">{item.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">By {item.seller}</span>
                    {item.rating && (
                      <div className="flex items-center ml-2">
                        <i className="ri-star-fill text-yellow-500" aria-hidden="true"></i>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{item.rating}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.location}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center mr-3">
                    <i className="ri-truck-line mr-1" aria-hidden="true"></i>
                    {item.delivery}
                  </span>
                  {item.sales && (
                    <span className="flex items-center">
                      <i className="ri-shopping-bag-line mr-1" aria-hidden="true"></i>
                      {item.sales} sold
                    </span>
                  )}
                </div>
                
                <BuyItemButton item={item} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="ri-search-line text-6xl text-gray-400 mb-4" aria-hidden="true"></i>
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search term or browse our categories
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/marketplace/equipment" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Browse Equipment
            </Link>
            <Link href="/designs" className="px-4 py-2 bg-orange-600 text-white rounded-lg">
              Browse Designs
            </Link>
            <Link href="/marketplace/ai-solutions" className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Browse AI Solutions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
