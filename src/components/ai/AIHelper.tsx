'use client';
import { useState, useEffect, useRef } from 'react';

export default function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [manuallyClosedOnce, setManuallyClosedOnce] = useState(false);
  const [messages, setMessages] = useState<{type: 'user' | 'ai', text: string}[]>([
    {type: 'ai', text: 'Hello! I\'m your AI farming assistant. How can I help you today?'},
    {type: 'ai', text: 'I can help you find fresh produce, equipment, or connect with other farmers!'}
  ]);
  const [input, setInput] = useState('');
  const autoSuggest = useRef<string[]>([
    "Find organic tomatoes near me",
    "How do I set up hydroponics?",
    "Show me vertical farming designs",
    "What's the best season to plant wheat?",
    "Connect me with equipment suppliers"
  ]);

  // Wiggle animation and auto-open effect
  useEffect(() => {
    const wiggleInterval = setInterval(() => {
      if (!isOpen && !manuallyClosedOnce) {
        setIsWiggling(true);
        setTimeout(() => setIsWiggling(false), 1000);
      }
    }, 15000);

    // Auto open after some time, but only if not manually closed before
    const openTimeout = setTimeout(() => {
      if (!manuallyClosedOnce && !isOpen) {
        setIsOpen(true);
      }
    }, 30000);

    return () => {
      clearInterval(wiggleInterval);
      clearTimeout(openTimeout);
    };
  }, [isOpen, manuallyClosedOnce]);

  const toggleHelper = (fromCloseButton = false) => {
    if (isOpen && fromCloseButton) {
      setManuallyClosedOnce(true);
    }
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, {type: 'user', text: input}]);
    setInput('');
    
    // Simulate AI response with more detailed farming-specific answers
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
      }
      
      setMessages(prev => [...prev, {
        type: 'ai', 
        text: response
      }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages([...messages, {type: 'user', text: suggestion}]);
    
    setTimeout(() => {
      let response = "I'm searching for information about that...";
      
      if (suggestion.includes("tomatoes")) {
        response = "I found 8 farmers selling organic tomatoes within 20 miles of your location, with prices ranging from 0.03-0.06 ETH per kg. Would you like to filter by price or distance?";
      } else if (suggestion.includes("hydroponics")) {
        response = "Setting up hydroponics requires a water pump, growing medium, nutrient solution, and containers. I can recommend a starter kit from HydroTech for 0.15 ETH or help you build your own system step by step.";
      } else if (suggestion.includes("vertical farming")) {
        response = "I've found 12 vertical farming designs in our marketplace. The most popular is GreenTower by UrbanGrow, which uses 80% less water than traditional farming methods. Would you like to view the specifications?";
      } else if (suggestion.includes("wheat")) {
        response = "In your climate zone, the best time to plant wheat is early fall (September-October) for winter wheat or early spring (March-April) for spring wheat. I can provide a detailed growing calendar tailored to your location.";
      } else if (suggestion.includes("equipment")) {
        response = "I've connected you with 5 verified equipment suppliers. FarmTech Solutions specializes in small-scale automation, while MaxYield offers larger industrial equipment. What specific type of equipment are you looking for?";
      }
      
      setMessages(prev => [...prev, {
        type: 'ai', 
        text: response
      }]);
    }, 1000);
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-3 bg-green-600 text-white font-medium flex justify-between items-center">
            <span className="flex items-center">
              <i className="ri-plant-line mr-2" aria-hidden="true"></i>
              AI Farm Assistant
            </span>
            <button 
              onClick={() => toggleHelper(true)} 
              className="text-white hover:bg-green-700 p-1 rounded-full transition-colors"
              aria-label="Close assistant"
            >
              <i className="ri-close-line text-xl" aria-hidden="true"></i>
            </button>
          </div>
          <div className="h-72 overflow-y-auto p-3 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-lg ${message.type === 'user' ? 'bg-green-100 dark:bg-green-900/80 text-green-900 dark:text-green-50' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick suggestions */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-800 overflow-x-auto whitespace-nowrap">
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
              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-r-lg transition-colors"
            >
              <i className="ri-send-plane-fill" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      )}
      <button 
        onClick={() => toggleHelper(false)}
        className={`h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-lg transition-all 
                 ${isWiggling ? 'animate-wiggle' : ''}`}
        aria-label="Open AI Assistant"
      >
        <i className="ri-robot-line text-2xl" aria-hidden="true"></i>
      </button>
    </div>
  );
}
