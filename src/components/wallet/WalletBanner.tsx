'use client';

import { useWallet } from '@/contexts/WalletContext';

export default function WalletBanner() {
  const { wallet, connecting, connectWallet } = useWallet();
  
  if (wallet.connected) {
    return (
      <div className="bg-green-100 dark:bg-green-900/30 py-2 px-4 flex items-center justify-center text-sm">
        <i className="ri-wallet-3-line text-green-600 mr-2"></i>
        <span className="text-green-800 dark:text-green-300">
          Connected: {`${wallet.address?.slice(0, 6)}...${wallet.address?.slice(-4)}`}
        </span>
      </div>
    );
  }
  
  return (
    <div className="bg-yellow-100 dark:bg-yellow-900/30 py-2 px-4 flex items-center justify-between text-sm">
      <span className="text-yellow-800 dark:text-yellow-300">
        <i className="ri-wallet-3-line mr-2"></i>
        Wallet not connected
      </span>
      <button 
        onClick={connectWallet}
        disabled={connecting}
        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors"
      >
        {connecting ? 'Connecting...' : 'Connect'}
      </button>
    </div>
  );
}
