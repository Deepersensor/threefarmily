'use client';
import { useState } from 'react';

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'ai', text: string}[]>([
    {type: 'ai', text: 'Hello! I\'m your AI farming assistant. How can I help you today?'}
  ]);
  const [input, setInput] = useState('');

  const toggleHelper = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, {type: 'user', text: input}]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai', 
        text: `I see you're interested in "${input}". I can help you find the best resources for that in our marketplace.`
      }]);
    }, 1000);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 bg-green-600 text-white font-medium flex justify-between items-center">
            <span>AI Farm Assistant</span>
            <button onClick={toggleHelper} className="text-white">
              <i className="ri-close-line text-xl" aria-hidden="true"></i>
            </button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3/4 p-2 rounded-lg ${message.type === 'user' ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 dark:border-gray-800 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about farming, markets, etc..."
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
      )}
      <button 
        onClick={toggleHelper} 
        className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-colors"
      >
        <i className="ri-robot-line text-2xl" aria-hidden="true"></i>
      </button>
    </div>
  );
}
