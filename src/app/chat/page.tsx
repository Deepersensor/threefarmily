'use client';
import { useState } from 'react';

const contacts = [
  { id: '1', name: 'FarmToTable', walletAddress: '0x1234...5678', lastMessage: 'Do you have fresh apples available?', iconColor: 'text-green-500' },
  { id: '2', name: 'TechFarm', walletAddress: '0x8765...4321', lastMessage: 'I'm interested in your irrigation system', iconColor: 'text-blue-500' },
  { id: '3', name: 'GreenArchitects', walletAddress: '0x5432...1098', lastMessage: 'The vertical farm design looks great!', iconColor: 'text-orange-500' },
  { id: '4', name: 'OrganicFarmer', walletAddress: '0x9876...5432', lastMessage: 'Can you ship internationally?', iconColor: 'text-purple-500' },
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
            <i className="ri-search-line absolute left-2.5 top-3 text-gray-500" aria-hidden="true"></i>
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
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${contact.iconColor.replace('text', 'bg').replace('500', '200')} dark:${contact.iconColor.replace('text', 'bg').replace('500', '900')}/30`}>
                  <span className="font-bold text-lg">{contact.name.charAt(0)}</span>
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
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedContact.iconColor.replace('text', 'bg').replace('500', '200')} dark:${selectedContact.iconColor.replace('text', 'bg').replace('500', '900')}/30`}>
            <span className="font-bold text-lg">{selectedContact.name.charAt(0)}</span>
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
            <i className="ri-send-plane-fill" aria-hidden="true"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
