'use client';
import { useState } from 'react';
import Image from 'next/image';

const contacts = [
  { id: '1', name: 'FarmToTable', walletAddress: '0x1234...5678', lastMessage: 'Do you have fresh apples available?', avatar: '/avatar1.jpg' },
  { id: '2', name: 'TechFarm', walletAddress: '0x8765...4321', lastMessage: 'I'm interested in your irrigation system', avatar: '/avatar2.jpg' },
  { id: '3', name: 'GreenArchitects', walletAddress: '0x5432...1098', lastMessage: 'The vertical farm design looks great!', avatar: '/avatar3.jpg' },
  { id: '4', name: 'OrganicFarmer', walletAddress: '0x9876...5432', lastMessage: 'Can you ship internationally?', avatar: '/avatar4.jpg' },
];

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{id: string, text: string, sender: 'user' | 'contact', timestamp: string}[]>([
    {id: '1', text: 'Hello! I saw your listing for organic tomatoes.', sender: 'contact', timestamp: '10:30 AM'},
    {id: '2', text: 'Yes, they are freshly harvested this morning.', sender: 'user', timestamp: '10:32 AM'},
    {id: '3', text: 'Great! What's your price for 5kg?', sender: 'contact', timestamp: '10:33 AM'},
    {id: '4', text: '0.025 ETH for 5kg including delivery within 50km.', sender: 'user', timestamp: '10:35 AM'},
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: `${messages.length + 1}`,
      text: message,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Contact List */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold">Messages</h2>
          <div className="mt-2 relative">
            <input 
              type="text"
              placeholder="Search contacts or wallets"
              className="w-full p-2 pl-8 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800"
            />
            <svg className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="overflow-y-auto h-full">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedContact.id === contact.id ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
            >
              <div className="flex items-center">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image src={contact.avatar} alt={contact.name} layout="fill" objectFit="cover" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-gray-500">12:30 PM</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-950">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image src={selectedContact.avatar} alt={selectedContact.name} layout="fill" objectFit="cover" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{selectedContact.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">{selectedContact.walletAddress}</p>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'user' ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800'}`}>
                <p>{msg.text}</p>
                <span className={`block text-xs mt-1 ${msg.sender === 'user' ? 'text-green-200' : 'text-gray-500'}`}>{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg dark:bg-gray-800 focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-green-600 text-white p-2 rounded-r-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
