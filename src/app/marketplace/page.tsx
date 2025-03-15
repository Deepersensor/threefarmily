import Link from 'next/link';
import Image from "next/image";
import WalletBanner from '../../components/wallet/WalletBanner';

const categories = [
  { name: "AI Chat", icon: "message", href: "/chat", color: "bg-green-600" },
  { name: "Farm Equipment", icon: "tool", href: "/marketplace/equipment", color: "bg-blue-600" },
  { name: "AI Solutions", icon: "robot", href: "/marketplace/ai-solutions", color: "bg-purple-600" },
  { name: "Farm Designs", icon: "layout", href: "/marketplace/designs", color: "bg-orange-600" },
];

const featuredItems = [
  {
    id: 1,
    name: "Organic Tomatoes",
    icon: "seedling",
    price: "0.05 ETH",
    seller: "FarmToTable",
    location: "Sicily, Italy",
    category: "produce",
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500",
    verified: true,
    rating: 4.8,
    sales: 247,
    delivery: "2-3 days",
    description: "Freshly harvested organic Roma tomatoes, grown with sustainable practices and zero pesticides."
  },
  {
    id: 2,
    name: "Harvesting Drone",
    icon: "flight-takeoff",
    price: "2.3 ETH",
    seller: "TechFarm",
    location: "San Francisco, USA",
    category: "equipment",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    verified: true,
    rating: 4.9,
    sales: 56,
    delivery: "7-10 days",
    description: "Autonomous harvesting drone with AI-powered fruit recognition and gentle collection system."
  },
  {
    id: 3,
    name: "Vertical Farm Design",
    icon: "building",
    price: "1.8 ETH",
    seller: "GreenArchitects",
    location: "Singapore",
    category: "design",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500",
    verified: true,
    rating: 5.0,
    sales: 18,
    delivery: "Digital delivery",
    description: "Complete vertical farm blueprint for urban settings, optimized for space and water efficiency."
  },
  {
    id: 4,
    name: "AI Crop Monitoring",
    icon: "cpu-line",
    price: "0.9 ETH",
    seller: "DataHarvest",
    location: "Tel Aviv, Israel",
    category: "ai",
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500",
    verified: false,
    rating: 4.6,
    sales: 103,
    delivery: "Instant",
    description: "Real-time crop monitoring system using computer vision to detect diseases and optimize watering."
  },
];

const trendingItems = [
  {
    id: 5,
    name: "Weather Prediction AI",
    icon: "cloudy-line",
    price: "0.7 ETH",
    seller: "WeatherWise",
    location: "Zurich, Switzerland",
    category: "ai",
    color: "bg-sky-100 dark:bg-sky-900/30",
    iconColor: "text-sky-500",
    trending: true,
    verified: true,
    rating: 4.7,
    views: 2341
  },
  {
    id: 6,
    name: "Organic Fertilizer",
    icon: "water-flash-line",
    price: "0.08 ETH",
    seller: "EcoFarms",
    location: "Amsterdam, Netherlands",
    category: "produce",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600",
    trending: true,
    verified: true,
    rating: 4.9,
    views: 1876
  },
  {
    id: 7,
    name: "Solar Irrigation System",
    icon: "sun-line",
    price: "1.2 ETH",
    seller: "SolarGrow",
    location: "Melbourne, Australia",
    category: "equipment",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600",
    trending: true,
    verified: false,
    rating: 4.5,
    views: 3102
  },
];

const recentlyAdded = [
  {
    id: 8,
    name: "Modular Farm Kit",
    icon: "box-3-line",
    price: "3.5 ETH",
    seller: "ModuGrow",
    location: "Berlin, Germany",
    category: "equipment",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600",
    timeAdded: "2 hours ago"
  },
  {
    id: 9,
    name: "Soil Analysis Kit",
    icon: "test-tube-line",
    price: "0.25 ETH",
    seller: "SoilScience",
    location: "Toronto, Canada",
    category: "equipment",
    color: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-600",
    timeAdded: "5 hours ago"
  },
  {
    id: 10,
    name: "Hydroponic Lettuce",
    icon: "plant-line",
    price: "0.02 ETH",
    seller: "HydroGreens",
    location: "Copenhagen, Denmark",
    category: "produce",
    color: "bg-lime-100 dark:bg-lime-900/30",
    iconColor: "text-lime-600",
    timeAdded: "12 hours ago"
  },
];

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Global Marketplace</h1>
        <div className="flex space-x-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <i className="ri-filter-3-line" aria-hidden="true"></i>
            Filter
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <i className="ri-sort-desc" aria-hidden="true"></i>
            Sort
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
            <i className="ri-add-line" aria-hidden="true"></i>
            List Item
          </button>
        </div>
      </div>
      
      {/* Wallet Connect Banner */}
      <WalletBanner />
      
      {/* Featured banner */}
      <div className="relative rounded-xl overflow-hidden h-48 mb-12 bg-gradient-to-r from-green-700 to-green-500">
        <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Spring Planting Season</h2>
          <p className="mb-4 max-w-lg">Find everything you need to kickstart your spring crops with exclusive deals on seeds, equipment, and expert advice.</p>
          <button className="bg-white text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors w-fit">
            Explore Deals
          </button>
        </div>
        <div className="absolute right-0 bottom-0">
          <i className="ri-plant-line text-white/20 text-[180px]" aria-hidden="true"></i>
        </div>
      </div>
      
      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`relative rounded-lg overflow-hidden group h-32 ${category.color} flex flex-col items-center justify-center text-white transition-transform hover:scale-105 duration-300`}
            >
              <i className={`ri-${category.icon}-line text-4xl mb-2`} aria-hidden="true"></i>
              <h3 className="text-lg font-bold text-center">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Items */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Items</h2>
          <Link href="/marketplace/all" className="text-green-600 hover:text-green-700 flex items-center">
            View all
            <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-40 ${item.color} flex items-center justify-center relative`}>
                <i className={`ri-${item.icon} text-5xl ${item.iconColor}`} aria-hidden="true"></i>
                {item.verified && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <i className="ri-check-line mr-1" aria-hidden="true"></i> Verified
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-green-600 font-bold mt-1">{item.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">By {item.seller}</span>
                    {item.rating && (
                      <div className="flex items-center ml-2">
                        <i className="ri-star-fill text-yellow-500" aria-hidden="true"></i>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{item.rating}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.location}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center mr-3">
                    <i className="ri-truck-line mr-1" aria-hidden="true"></i>
                    {item.delivery}
                  </span>
                  <span className="flex items-center">
                    <i className="ri-shopping-bag-line mr-1" aria-hidden="true"></i>
                    {item.sales} sold
                  </span>
                </div>
                <button className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Trending Now */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <i className="ri-fire-fill text-orange-500 text-2xl mr-2" aria-hidden="true"></i>
          <h2 className="text-2xl font-semibold">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trendingItems.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex">
              <div className={`w-24 ${item.color} flex items-center justify-center`}>
                <i className={`ri-${item.icon} text-3xl ${item.iconColor}`} aria-hidden="true"></i>
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-base">{item.name}</h3>
                  <span className="text-green-600 font-bold">{item.price}</span>
                </div>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-gray-600 dark:text-gray-400">{item.seller}</span>
                  {item.verified && (
                    <span className="ml-1 text-green-600">
                      <i className="ri-check-double-line" aria-hidden="true"></i>
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <i className="ri-eye-line mr-1" aria-hidden="true"></i>
                    {item.views.toLocaleString()} views
                  </span>
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-500" aria-hidden="true"></i>
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Recently Added */}
      <section>
        <div className="flex items-center mb-4">
          <i className="ri-time-line text-blue-500 text-2xl mr-2" aria-hidden="true"></i>
          <h2 className="text-2xl font-semibold">Recently Added</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentlyAdded.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center mr-3`}>
                    <i className={`ri-${item.icon} ${item.iconColor}`} aria-hidden="true"></i>
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.timeAdded}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.seller}, {item.location}</span>
                  <span className="font-bold text-green-600">{item.price}</span>
                </div>
                <button className="mt-3 w-full py-1.5 border border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-md transition-colors text-sm">
                  View Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
