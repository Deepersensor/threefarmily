'use client';
import React, { createContext, useState, useContext, ReactNode } from 'react';
import flareService from '../utils/flareService';

interface WalletContextType {
  wallet: {
    connected: boolean;
    address: string | null;
    chainId: number | null;
  };
  connecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState({
    connected: false,
    address: null,
    chainId: null
  });
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Connect to wallet
  const connectWallet = async () => {
    try {
      setConnecting(true);
      setError(null);
      
      // Check if we can connect to the Flare network
      const chainId = await flareService.getChainId();
      
      // In a real app, you would integrate with MetaMask or similar
      // For demo, we're just creating an account
      const newAccount = flareService.createAccount();
      
      // Set the wallet state
      setWallet({
        connected: true,
        address: newAccount.address,
        chainId: chainId
      });
      
      // Store in localStorage (only for demo purposes - never store private keys in localStorage in production)
      localStorage.setItem('farmChainWalletAddress', newAccount.address);
      
    } catch (error) {
      console.error("Connection error:", error);
      setError("Failed to connect to the Flare network");
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      connected: false,
      address: null,
      chainId: null
    });
    localStorage.removeItem('farmChainWalletAddress');
  };

  // Check if wallet was previously connected
  React.useEffect(() => {
    const savedAddress = localStorage.getItem('farmChainWalletAddress');
    if (savedAddress) {
      flareService.getChainId().then(chainId => {
        setWallet({
          connected: true,
          address: savedAddress,
          chainId
        });
      }).catch(error => {
        console.error("Failed to reconnect wallet:", error);
        localStorage.removeItem('farmChainWalletAddress');
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{ 
      wallet, 
      connecting, 
      error, 
      connectWallet, 
      disconnectWallet 
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
