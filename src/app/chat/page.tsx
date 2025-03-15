'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'This is a sample AI response. In production, this would be connected to your AI backend.'
      }]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex gap-4">
      {/* Left sidebar - User search */}
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 rounded-lg p-4 h-[calc(100vh-2rem)]">
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search users..."
            className="w-full px-3 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          {/* Sample users - replace with actual user data */}
          {['Alice', 'Bob', 'Charlie'].map(user => (
            <button 
              key={user}
              className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              {user}
            </button>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg flex flex-col h-[calc(100vh-2rem)]">
        {/* Chat header */}
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">AI Assistant</h1>
          <Link 
            href="/marketplace" 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Marketplace
          </Link>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.type === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
