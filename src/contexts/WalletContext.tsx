'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WalletState {
  connected: boolean;
  address?: string;
  chainId?: string;
}

interface WalletContextType {
  wallet: WalletState;
  connecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const defaultWalletContext: WalletContextType = {
  wallet: {
    connected: false,
  },
  connecting: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
};

const WalletContext = createContext<WalletContextType>(defaultWalletContext);

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
  });
  const [connecting, setConnecting] = useState(false);

  // Check if previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      try {
        const parsed = JSON.parse(savedWallet);
        setWallet(parsed);
      } catch (error) {
        console.error('Failed to parse saved wallet data', error);
        localStorage.removeItem('wallet');
      }
    }
  }, []);

  const connectWallet = async () => {
    setConnecting(true);
    
    try {
      // Simulate wallet connection with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockWallet = {
        connected: true,
        address: '0x' + Math.random().toString(16).slice(2, 10) + Math.random().toString(16).slice(2, 10),
        chainId: '14',  // Flare network
      };
      
      setWallet(mockWallet);
      localStorage.setItem('wallet', JSON.stringify(mockWallet));
    } catch (error) {
      console.error('Failed to connect wallet', error);
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({ connected: false });
    localStorage.removeItem('wallet');
  };

  return (
    <WalletContext.Provider value={{ wallet, connecting, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
