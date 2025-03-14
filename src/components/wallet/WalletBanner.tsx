'use client';
import { useWallet } from '../../contexts/WalletContext';

export default function WalletBanner() {
  const { wallet, connecting, connectWallet, error } = useWallet();
  
  if (wallet.connected) return null;
  
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Connect to the Flare Network</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Connect your wallet to buy, sell and trade farming products on the blockchain
          </p>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
          )}
        </div>
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          {connecting ? (
            <>
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              Connecting...
            </>
          ) : (
            <>
              <i className="ri-wallet-3-line mr-2"></i>
              Connect Wallet
            </>
          )}
        </button>
      </div>
    </div>
  );
}
