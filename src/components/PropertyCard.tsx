
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, SquareIcon } from "lucide-react";

interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  featured: boolean;
  forSale: boolean;
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isCompared, setIsCompared] = useState(false);
  
  const toggleCompare = () => {
    setIsCompared(!isCompared);
  };
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 space-y-2">
          {property.featured && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
              Featured
            </Badge>
          )}
          {property.forSale && (
            <Badge className="bg-gray-500 hover:bg-gray-600 text-white border-none block mt-2">
              For Sale
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/property/${property.id}`} className="block">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span>{property.address}</span>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Bed size={16} className="mr-1" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath size={16} className="mr-1" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center">
            <SquareIcon size={16} className="mr-1" />
            <span>{property.sqft} Sqft</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">${property.price}</span>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs border-gray-300 hover:bg-gray-100"
              onClick={toggleCompare}
            >
              {isCompared ? "Compared" : "Compare"}
            </Button>
            <Link to={`/property/${property.id}`}>
              <Button 
                size="sm" 
                className="text-xs bg-white text-primary border border-primary hover:bg-primary hover:text-white"
              >
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
