import Image from "next/image";

const categories = [
  { name: "Fresh Produce", icon: "leaf", href: "/produce", color: "bg-green-600" },
  { name: "Farm Equipment", icon: "tool", href: "/equipment", color: "bg-blue-600" },
  { name: "AI Solutions", icon: "robot", href: "/ai-solutions", color: "bg-purple-600" },
  { name: "Farm Designs", icon: "layout", href: "/designs", color: "bg-orange-600" },
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
    iconColor: "text-red-500"
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
    iconColor: "text-blue-500"
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
    iconColor: "text-green-500"
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
    iconColor: "text-purple-500"
  },
];

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Global Marketplace</h1>
      
      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href={category.href}
              className={`relative rounded-lg overflow-hidden group h-32 ${category.color} flex flex-col items-center justify-center text-white transition-transform hover:scale-105 duration-300`}
            >
              <i className={`ri-${category.icon}-line text-4xl mb-2`} aria-hidden="true"></i>
              <h3 className="text-lg font-bold text-center">{category.name}</h3>
            </a>
          ))}
        </div>
      </section>
      
      {/* Featured Items */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Items</h2>
          <a href="/marketplace/all" className="text-green-600 hover:text-green-700">View all</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className={`h-40 ${item.color} flex items-center justify-center`}>
                <i className={`ri-${item.icon} text-5xl ${item.iconColor}`} aria-hidden="true"></i>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-green-600 font-bold mt-1">{item.price}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">By {item.seller}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.location}</span>
                </div>
                <button className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
