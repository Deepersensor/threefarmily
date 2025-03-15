'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import flareService from '../utils/flareService';

// Define wallet context state type
type WalletState = {
  connected: boolean;
  address: string;
  balance: string;
  chainId: number | null;
  privateKey: string; // Note: In production, never store private keys in browser
};

// Define wallet context type
type WalletContextType = {
  wallet: WalletState;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  refreshBalance: () => Promise<void>;
  buyItem: (itemId: number, sellerAddress: string, price: string) => Promise<any>;
};

// Default wallet state
const defaultWalletState: WalletState = {
  connected: false,
  address: '',
  balance: '0',
  chainId: null,
  privateKey: '',
};

// Create wallet context
const WalletContext = createContext<WalletContextType>({
  wallet: defaultWalletState,
  connecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  refreshBalance: async () => {},
  buyItem: async () => ({}),
});

// Hook to use wallet context
export const useWallet = () => useContext(WalletContext);

// Wallet provider component
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>(defaultWalletState);
  const [connecting, setConnecting] = useState(false);

  // Check for saved wallet on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('farmChainWallet');
    if (savedWallet) {
      try {
        const parsedWallet = JSON.parse(savedWallet);
        setWallet(parsedWallet);
        
        // Verify connection and refresh balance
        (async () => {
          try {
            const chainId = await flareService.getChainId();
            const balance = await flareService.getBalance(parsedWallet.address);
            setWallet(prev => ({ ...prev, chainId, balance }));
          } catch (error) {
            console.error("Error verifying wallet connection:", error);
            disconnectWallet();
          }
        })();
      } catch (error) {
        console.error("Error loading saved wallet:", error);
        localStorage.removeItem('farmChainWallet');
      }
    }
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    setConnecting(true);
    try {
      // In production, this would connect to MetaMask or another wallet provider
      // For demo purposes, we'll create a new wallet using FlareService
      const chainId = await flareService.getChainId();
      const newAccount = flareService.createAccount();
      const balance = await flareService.getBalance(newAccount.address);
      
      const connectedWallet = {
        connected: true,
        address: newAccount.address,
        privateKey: newAccount.privateKey,
        balance,
        chainId,
      };
      
      setWallet(connectedWallet);
      
      // Save wallet to localStorage
      localStorage.setItem('farmChainWallet', JSON.stringify(connectedWallet));
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    setWallet(defaultWalletState);
    localStorage.removeItem('farmChainWallet');
  };

  // Refresh balance function
  const refreshBalance = async () => {
    if (wallet.connected && wallet.address) {
      try {
        const balance = await flareService.getBalance(wallet.address);
        setWallet(prev => ({ ...prev, balance }));
      } catch (error) {
        console.error("Error refreshing balance:", error);
      }
    }
  };

  // Buy item function
  const buyItem = async (itemId: number, sellerAddress: string, displayPrice: string) => {
    if (!wallet.connected || !wallet.address) {
      throw new Error("Wallet not connected");
    }

    try {
      // Convert displayed price (e.g., "0.8 ETH") to actual value
      const amount = flareService.convertDisplayPriceToValue(displayPrice);
      
      // Process purchase transaction
      const result = await flareService.purchaseMarketplaceItem(
        wallet.address,
        sellerAddress,
        amount,
        wallet.privateKey,
        itemId
      );

      // Refresh balance after purchase
      await refreshBalance();
      
      return result;
    } catch (error) {
      console.error("Error purchasing item:", error);
      throw error;
    }
  };

  const value = {
    wallet,
    connecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
    buyItem,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
