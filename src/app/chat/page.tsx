'use client';

import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';

export default function ChatPage() {
  const { wallet } = useWallet();
  const [message, setMessage] = useState('');

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chat</h1>
        
        {!wallet.connected ? (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg">
            Please connect your wallet to use the chat feature
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-[60vh] border border-gray-200 dark:border-gray-800 rounded-lg p-4 overflow-y-auto">
              {/* Chat messages will go here */}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-200 dark:border-gray-800 rounded-lg"
              />
              <button 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
