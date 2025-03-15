// Common item type for marketplace
export type MarketplaceItem = {
  id: number;
  name: string;
  icon: string;
  price: string;
  seller: string;
  location: string;
  category: string;
  color: string;
  iconColor: string;
  verified?: boolean;
  rating?: number;
  sales?: number;
  views?: number;
  delivery?: string;
  description?: string;
  timeAdded?: string;
};

// Equipment items
export const equipmentItems: MarketplaceItem[] = [
  {
    id: 101,
    name: "Automated Irrigation System",
    icon: "water-flash",
    price: "0.8 ETH",
    seller: "AquaTech",
    location: "Tel Aviv, Israel",
    category: "equipment",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    verified: true,
    rating: 4.7,
    sales: 89,
    delivery: "10-14 days",
    description: "Smart irrigation system with soil moisture sensors and automated scheduling. Reduces water usage by up to 40%."
  },
  {
    id: 102,
    name: "Compact Tractor",
    icon: "truck",
    price: "5.2 ETH",
    seller: "FarmMech",
    location: "Munich, Germany",
    category: "equipment",
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500",
    verified: true,
    rating: 4.9,
    sales: 23,
    delivery: "30-45 days",
    description: "Versatile compact tractor suitable for small to medium farms. Includes front loader attachment and power take-off."
  },
  {
    id: 103,
    name: "Smart Greenhouse Kit",
    icon: "home-6",
    price: "2.7 ETH",
    seller: "GreenTech",
    location: "Portland, USA",
    category: "equipment",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500",
    verified: true,
    rating: 4.8,
    sales: 65,
    delivery: "14-21 days",
    description: "Complete greenhouse automation system with climate control, automated vents, and remote monitoring capabilities."
  },
  {
    id: 104,
    name: "Soil Testing Kit",
    icon: "test-tube",
    price: "0.25 ETH",
    seller: "SoilScience",
    location: "Toronto, Canada",
    category: "equipment",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-500",
    verified: false,
    rating: 4.5,
    sales: 312,
    delivery: "3-5 days",
    description: "Professional-grade soil testing kit that analyzes NPK levels, pH, and micronutrient content for optimal crop planning."
  },
  {
    id: 105,
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
    id: 106,
    name: "Solar Irrigation System",
    icon: "sun-line",
    price: "1.2 ETH",
    seller: "SolarGrow",
    location: "Melbourne, Australia",
    category: "equipment",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600",
    verified: false,
    rating: 4.5,
    sales: 74,
    delivery: "14-21 days",
    description: "Complete solar-powered irrigation solution. Includes solar panels, pump system, and smart controls for efficient water use."
  },
];

// AI Solutions items
export const aiSolutionsItems: MarketplaceItem[] = [
  {
    id: 201,
    name: "Crop Health Monitor",
    icon: "seedling",
    price: "0.85 ETH",
    seller: "AgroAI",
    location: "Bangalore, India",
    category: "ai",
    color: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-500",
    verified: true,
    rating: 4.7,
    sales: 142,
    delivery: "Instant",
    description: "AI-powered crop monitoring system that detects diseases and pests using smartphone photos. Includes treatment recommendations."
  },
  {
    id: 202,
    name: "Weather Prediction AI",
    icon: "cloudy-line",
    price: "0.7 ETH",
    seller: "WeatherWise",
    location: "Zurich, Switzerland",
    category: "ai",
    color: "bg-sky-100 dark:bg-sky-900/30",
    iconColor: "text-sky-500",
    verified: true,
    rating: 4.7,
    sales: 215,
    delivery: "Instant",
    description: "Hyper-local weather forecasting AI trained specifically for agricultural applications. 90% accuracy up to 14 days in advance."
  },
  {
    id: 203,
    name: "Yield Prediction Model",
    icon: "line-chart",
    price: "1.1 ETH",
    seller: "DataHarvest",
    location: "Chicago, USA",
    category: "ai",
    color: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-500",
    verified: true,
    rating: 4.6,
    sales: 87,
    delivery: "Instant",
    description: "Machine learning model that predicts harvest yields based on historical data, weather patterns, and current crop conditions."
  },
  {
    id: 204,
    name: "Smart Irrigation Controller",
    icon: "water",
    price: "0.6 ETH",
    seller: "HydroLogic",
    location: "Austin, USA",
    category: "ai",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    verified: false,
    rating: 4.4,
    sales: 126,
    delivery: "Instant",
    description: "AI algorithm for irrigation systems that optimizes water usage based on soil moisture, weather forecasts, and crop water needs."
  },
  {
    id: 205,
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
  {
    id: 206,
    name: "Livestock Health Monitor",
    icon: "heart-pulse",
    price: "1.3 ETH",
    seller: "AnimalTech",
    location: "Dublin, Ireland",
    category: "ai",
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-500",
    verified: true,
    rating: 4.8,
    sales: 58,
    delivery: "Instant",
    description: "AI system for monitoring livestock health through video analysis. Detects unusual behavior and early signs of illness."
  },
];

// Farm Designs items
export const designItems: MarketplaceItem[] = [
  {
    id: 301,
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
    id: 302,
    name: "Aquaponics System Design",
    icon: "water-percent",
    price: "1.2 ETH",
    seller: "AquaDesign",
    location: "Amsterdam, Netherlands",
    category: "design",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-500",
    verified: true,
    rating: 4.9,
    sales: 24,
    delivery: "Digital delivery",
    description: "Comprehensive aquaponics system design that combines fish farming with hydroponic vegetable production. Includes materials list and build instructions."
  },
  {
    id: 303,
    name: "Smart Greenhouse Plans",
    icon: "home-8",
    price: "0.95 ETH",
    seller: "EcoHabitat",
    location: "Vancouver, Canada",
    category: "design",
    color: "bg-teal-100 dark:bg-teal-900/30",
    iconColor: "text-teal-500",
    verified: true,
    rating: 4.7,
    sales: 42,
    delivery: "Digital delivery",
    description: "Detailed plans for building a technologically advanced greenhouse with integrated climate control and automated systems."
  },
  {
    id: 304,
    name: "Urban Rooftop Farm",
    icon: "building-4",
    price: "1.4 ETH",
    seller: "UrbanHarvest",
    location: "New York, USA",
    category: "design",
    color: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-500",
    verified: false,
    rating: 4.5,
    sales: 29,
    delivery: "Digital delivery",
    description: "Architectural plans for converting urban rooftops into productive farm spaces. Includes structural considerations and maximize yield layouts."
  },
  {
    id: 305,
    name: "Permaculture Homestead",
    icon: "landscape",
    price: "2.1 ETH",
    seller: "PermaPlans",
    location: "Melbourne, Australia",
    category: "design",
    color: "bg-lime-100 dark:bg-lime-900/30",
    iconColor: "text-lime-600",
    verified: true,
    rating: 4.8,
    sales: 37,
    delivery: "Digital delivery",
    description: "Complete permaculture design for 1-5 acre homesteads. Features integrated systems for maximum sustainability and productivity."
  },
  {
    id: 306,
    name: "Modular Container Farm",
    icon: "box-3",
    price: "1.7 ETH",
    seller: "ContainerGrow",
    location: "Rotterdam, Netherlands",
    category: "design",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600",
    verified: true,
    rating: 4.9,
    sales: 21,
    delivery: "Digital delivery",
    description: "Shipping container conversion plans for high-efficiency hydroponic farming. Modular design allows for expansion."
  },
];
