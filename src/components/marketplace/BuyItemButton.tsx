'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { MarketplaceItem } from '@/data/marketplace';

interface BuyItemButtonProps {
  item: MarketplaceItem;
  buttonText?: string;
  className?: string;
}

export default function BuyItemButton({ 
  item, 
  buttonText = "Buy Now", 
  className = "mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
}: BuyItemButtonProps) {
  const { wallet, buyItem, connectWallet } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!wallet.connected) {
      connectWallet();
      return;
    }

    try {
      setIsLoading(true);
      const result = await buyItem(item.id, item.seller, item.price);
      setTransactionHash(result.transactionHash);
      
      // Show success message
      alert(`Successfully purchased ${item.name}! Transaction: ${result.transactionHash}`);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? (
          <>
            <i className="ri-loader-4-line animate-spin mr-2"></i>
            Processing...
          </>
        ) : (
          buttonText
        )}
      </button>
      
      {transactionHash && (
        <div className="mt-2 text-xs text-green-600 flex items-center">
          <i className="ri-check-double-line mr-1"></i>
          Purchase complete!
        </div>
      )}
    </div>
  );
}
