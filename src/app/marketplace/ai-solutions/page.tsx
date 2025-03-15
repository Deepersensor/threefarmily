'use client';

import { useState } from 'react';
import Link from 'next/link';
import WalletBanner from '@/components/wallet/WalletBanner';
import { aiSolutionsItems } from '@/data/marketplace';
import BuyItemButton from '@/components/marketplace/BuyItemButton';

export default function AISolutionsMarketplace() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  // Filter items by price range
  const getFilteredItems = () => {
    if (filter === 'all') return aiSolutionsItems;
    if (filter === 'low') return aiSolutionsItems.filter(item => parseFloat(item.price) < 0.8);
    if (filter === 'medium') return aiSolutionsItems.filter(item => parseFloat(item.price) >= 0.8 && parseFloat(item.price) <= 1.0);
    if (filter === 'high') return aiSolutionsItems.filter(item => parseFloat(item.price) > 1.0);
    return aiSolutionsItems;
  };
  
  // Sort items
  const getSortedItems = () => {
    const filtered = getFilteredItems();
    if (sortBy === 'newest') return filtered;
    if (sortBy === 'price-low') return [...filtered].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sortBy === 'price-high') return [...filtered].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    if (sortBy === 'rating') return [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return filtered;
  };
  
  const displayItems = getSortedItems();
  
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 md:mb-0">AI Solutions</h1>
          <p className="text-gray-600 dark:text-gray-400">Advanced AI systems for modern agriculture</p>
        </div>
        <Link href="/marketplace" className="flex items-center gap-1 text-sm mt-2 md:mt-0">
          <i className="ri-arrow-left-line" aria-hidden="true"></i>
          Back to Marketplace
        </Link>
      </div>
      
      {/* Wallet Connect Banner */}
      <WalletBanner />
      
      {/* Filters and Sort */}
      <div className="mb-8 flex flex-wrap items-center gap-4 mt-6">
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">Price Range:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="py-1 px-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
          >
            <option value="all">All Prices</option>
            <option value="low">Below 0.8 ETH</option>
            <option value="medium">0.8-1.0 ETH</option>
            <option value="high">Above 1.0 ETH</option>
          </select>
        </div>
        
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-1 px-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
      
      {/* AI Solutions Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayItems.map((item) => (
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
                  <i className="ri-cpu-line mr-1" aria-hidden="true"></i>
                  {item.delivery}
                </span>
                <span className="flex items-center">
                  <i className="ri-shopping-bag-line mr-1" aria-hidden="true"></i>
                  {item.sales} sold
                </span>
              </div>
              
              {/* Buy button component */}
              <BuyItemButton item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
