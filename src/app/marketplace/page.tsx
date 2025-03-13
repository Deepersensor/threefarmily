import Image from "next/image";

const categories = [
  { name: "Fresh Produce", image: "/produce-category.jpg", href: "/produce" },
  { name: "Farm Equipment", image: "/equipment-category.jpg", href: "/equipment" },
  { name: "AI Solutions", image: "/ai-solutions-category.jpg", href: "/ai-solutions" },
  { name: "Farm Designs", image: "/design-category.jpg", href: "/designs" },
];

const featuredItems = [
  {
    id: 1,
    name: "Organic Tomatoes",
    image: "/tomatoes.jpg",
    price: "0.05 ETH",
    seller: "FarmToTable",
    location: "Sicily, Italy",
    category: "produce",
  },
  {
    id: 2,
    name: "Harvesting Drone",
    image: "/drone.jpg",
    price: "2.3 ETH",
    seller: "TechFarm",
    location: "San Francisco, USA",
    category: "equipment",
  },
  {
    id: 3,
    name: "Vertical Farm Design",
    image: "/vertical-farm.jpg",
    price: "1.8 ETH",
    seller: "GreenArchitects",
    location: "Singapore",
    category: "design",
  },
  {
    id: 4,
    name: "AI Crop Monitoring",
    image: "/ai-crop.jpg",
    price: "0.9 ETH",
    seller: "DataHarvest",
    location: "Tel Aviv, Israel",
    category: "ai",
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
              className="relative rounded-lg overflow-hidden group h-40"
            >
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold text-center">{category.name}</h3>
              </div>
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform group-hover:scale-105 duration-300"
              />
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
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                />
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
