'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import WalletBanner from '@/components/wallet/WalletBanner';
import { useWallet } from '@/contexts/WalletContext';

// User type for search functionality
type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
};

// Message type
type Message = {
  type: 'user' | 'ai';
  content: string;
  timestamp?: Date;
};

// Sample user data
const sampleUsers: User[] = [
  { id: '1', name: 'Alice', avatar: 'user', status: 'online' },
  { id: '2', name: 'Bob', avatar: 'user-2', status: 'offline', lastSeen: '2 hours ago' },
  { id: '3', name: 'Charlie', avatar: 'user-3', status: 'away', lastSeen: '5 minutes ago' },
  { id: '4', name: 'Diana', avatar: 'user-4', status: 'online' },
  { id: '5', name: 'Eve', avatar: 'user-5', status: 'offline', lastSeen: 'yesterday' },
  { id: '6', name: 'Frank', avatar: 'user-6', status: 'online' },
  { id: '7', name: 'Grace', avatar: 'user-7', status: 'away', lastSeen: '30 minutes ago' },
  { id: '8', name: 'Henry', avatar: 'user-8', status: 'online' },
  { id: '9', name: 'Isabella', avatar: 'user', status: 'offline', lastSeen: '3 days ago' },
  { id: '10', name: 'Jack', avatar: 'user-2', status: 'online' },
  { id: '11', name: 'Katherine', avatar: 'user-3', status: 'away', lastSeen: '1 hour ago' },
  { id: '12', name: 'Liam', avatar: 'user-4', status: 'online' },
];

export default function ChatPage() {
  const { wallet } = useWallet();
  const [messages, setMessages] = useState<Message[]>([
    { type: 'ai', content: "Hello! I'm your AI farming assistant. How can I help you today?" },
    { type: 'ai', content: "I can help you find equipment, connect with other farmers, or answer questions about farming techniques!" }
  ]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-suggestions
  const autoSuggest = useRef<string[]>([
    "Find farming equipment near me",
    "How do I set up hydroponics?",
    "Show me vertical farming designs",
    "What's the best season to plant wheat?",
    "Connect me with equipment suppliers"
  ]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = sampleUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(sampleUsers);
    }
  }, [searchQuery]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response with farming-specific answers
    setTimeout(() => {
      const userQuery = input.toLowerCase();
      let response = `I'll help you with "${input}". Let me find the best resources for that.`;
      
      if (userQuery.includes("tomato") || userQuery.includes("tomatoes")) {
        response = "I found several organic tomato suppliers near you. The closest is FarmFresh Organics (4.8 stars, 3.2 miles away) selling Roma tomatoes for 0.04 ETH per kg. Would you like to connect with them?";
      } else if (userQuery.includes("equipment") || userQuery.includes("machinery")) {
        response = "I've located 3 equipment providers matching your query. TechFarm has the highest-rated automated irrigation systems starting at 0.8 ETH. Would you like to see their catalog?";
      } else if (userQuery.includes("design") || userQuery.includes("architect")) {
        response = "There are 5 architects on our platform specializing in sustainable farm design. EcoStructures has completed 27 projects with an average rating of 4.9 stars. Would you like to see their portfolio?";
      } else if (userQuery.includes("weather") || userQuery.includes("rain") || userQuery.includes("forecast")) {
        response = "Based on your farm's location, the 10-day forecast shows moderate rainfall (15mm) expected on Wednesday and Thursday. Would you like me to help adjust your irrigation schedule accordingly?";
      } else if (userQuery.includes("hydroponics")) {
        response = "Setting up hydroponics requires a water pump, growing medium, nutrient solution, and containers. I can recommend a starter kit from HydroTech for 0.15 ETH or help you build your own system step by step.";
      }
      
      setMessages(prev => [...prev, {
        type: 'ai', 
        content: response
      }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages([...messages, { type: 'user', content: suggestion }]);
    
    setTimeout(() => {
      let response = "I'm searching for information about that...";
      
      if (suggestion.includes("equipment")) {
        response = "I've found 12 equipment providers in your area. The top rated is FarmTech Solutions specializing in small-scale automation. Would you like me to filter by price range or specific equipment type?";
      } else if (suggestion.includes("hydroponics")) {
        response = "Setting up hydroponics requires a water pump, growing medium, nutrient solution, and containers. I can recommend a starter kit from HydroTech for 0.15 ETH or help you build your own system step by step.";
      } else if (suggestion.includes("vertical farming")) {
        response = "I've found 12 vertical farming designs in our marketplace. The most popular is GreenTower by UrbanGrow, which uses 80% less water than traditional farming methods. Would you like to view the specifications?";
      } else if (suggestion.includes("wheat")) {
        response = "In your climate zone, the best time to plant wheat is early fall (September-October) for winter wheat or early spring (March-April) for spring wheat. I can provide a detailed growing calendar tailored to your location.";
      } else if (suggestion.includes("connect")) {
        response = "I've identified 5 verified equipment suppliers in your region. Would you like me to introduce you to them or would you prefer to browse their catalogs first?";
      }
      
      setMessages(prev => [...prev, {
        type: 'ai', 
        content: response
      }]);
    }, 1000);
  };

  const selectUser = (user: User) => {
    setSelectedUser(user);
    // In a real app, you would load conversation history here
    setMessages([
      { type: 'ai', content: `This is the beginning of your conversation with ${user.name}.` },
      { type: 'ai', content: 'How can I help facilitate your connection?' }
    ]);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
      {/* Header section with wallet banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">AI Chat Assistant</h1>
        <Link href="/marketplace" className="flex items-center gap-1 text-sm">
          <i className="ri-arrow-left-line" aria-hidden="true"></i>
          Back to Marketplace
        </Link>
      </div>
      
      {/* Wallet Connect Banner */}
      <WalletBanner />
      
      <div className="flex flex-1 gap-4">
        {/* Left sidebar - User search */}
        <div className="hidden md:flex md:flex-col w-72 bg-white dark:bg-gray-800 rounded-lg p-4 h-[calc(100vh-14rem)]">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Connect with Farmers</h2>
            <div className="relative">
              <input
                type="search"
                placeholder="Search users..."
                className="w-full px-3 py-2 pl-9 rounded-lg border dark:border-gray-700 dark:bg-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="ri-search-line absolute left-3 top-2.5 text-gray-400" aria-hidden="true"></i>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {filteredUsers.map(user => (
                <button 
                  key={user.id}
                  className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center ${
                    selectedUser?.id === user.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                  }`}
                  onClick={() => selectUser(user)}
                >
                  <div className={`h-10 w-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-3 relative`}>
                    <i className={`ri-${user.avatar}-line text-green-600 dark:text-green-300`} aria-hidden="true"></i>
                    <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${
                      user.status === 'online' ? 'bg-green-500' : 
                      user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user.status === 'online' 
                        ? 'Online' 
                        : user.status === 'away'
                          ? `Away · ${user.lastSeen}`
                          : `Offline · ${user.lastSeen}`
                      }
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg flex flex-col h-[calc(100vh-14rem)]">
          {/* Chat header */}
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <div className="flex items-center">
              <i className="ri-robot-line text-2xl text-green-600 mr-2" aria-hidden="true"></i>
              <h1 className="text-xl font-bold">
                {selectedUser ? `Chat with ${selectedUser.name}` : 'AI Farm Assistant'}
              </h1>
            </div>
            {selectedUser && (
              <button 
                onClick={() => setSelectedUser(null)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Back to AI Assistant
              </button>
            )}
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'ai' && (
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mr-2">
                    <i className="ri-robot-line text-green-600 dark:text-green-300" aria-hidden="true"></i>
                  </div>
                )}
                <div 
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.type === 'user' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {msg.content}
                </div>
                {msg.type === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center ml-2">
                    <i className="ri-user-line text-white" aria-hidden="true"></i>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap">
            <div className="flex gap-2">
              {autoSuggest.current.map((suggestion, index) => (
                <button 
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded-full whitespace-nowrap hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
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
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <i className="ri-send-plane-fill mr-2" aria-hidden="true"></i>
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
