
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, BedDouble, Bath, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  image: string;
  price: string;
  isFeatured: boolean;
  isNew?: boolean;
  title: string;
  location: string;
  beds: number;
  baths: number;
}

const PropertyCard = ({ 
  image, 
  price, 
  isFeatured, 
  isNew, 
  title, 
  location, 
  beds, 
  baths 
}: PropertyCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isFeatured && (
            <Badge className="bg-primary text-white">Featured</Badge>
          )}
          {isNew && (
            <Badge className="bg-blue-500 text-white">New</Badge>
          )}
        </div>
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center">
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">${price}</h3>
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex border-t pt-4">
          <div className="flex items-center mr-4">
            <BedDouble className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm">{beds} beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm">{baths} baths</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularSearches = () => {
  const properties = [
    {
      image: "/placeholder.svg",
      price: "347,500",
      isFeatured: true,
      title: "Modern Villa with Pool",
      location: "123 Main St, Los Angeles, CA",
      beds: 3,
      baths: 2
    },
    {
      image: "/placeholder.svg",
      price: "462,000",
      isFeatured: true,
      isNew: true,
      title: "Luxury Family House",
      location: "456 Oak Ave, San Francisco, CA",
      beds: 4,
      baths: 3
    },
    {
      image: "/placeholder.svg",
      price: "295,000",
      isFeatured: true,
      title: "Downtown Apartment",
      location: "789 Pine St, Seattle, WA",
      beds: 2,
      baths: 2
    },
    {
      image: "/placeholder.svg",
      price: "524,000",
      isFeatured: true,
      title: "Suburban Family Home",
      location: "101 Elm Dr, Portland, OR",
      beds: 5,
      baths: 3
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Popular Searches</h2>
            <p className="text-gray-500 text-sm">Handpicked properties by our team</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" className="mr-2">All Property <ArrowRight className="ml-2 h-4 w-4" /></Button>
            <Button className="bg-primary">Add Property</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">2</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">3</Button>
          </div>
        </div>
        
        <div className="md:hidden mt-6 flex flex-col space-y-2">
          <Button variant="outline" className="w-full">All Property <ArrowRight className="ml-2 h-4 w-4" /></Button>
          <Button className="w-full bg-primary">Add Property</Button>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
