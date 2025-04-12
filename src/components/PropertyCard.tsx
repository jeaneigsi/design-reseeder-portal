import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart, SquareIcon } from "lucide-react";
import { Parcel, formatPrice } from "@/data/parcelsData";

interface PropertyCardProps {
  property: Parcel;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompared, setIsCompared] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleCompare = () => {
    setIsCompared(!isCompared);
  };

  return (
    // Wrap the entire card in a Link component
    <Link to={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img 
            src={property.images[0]} 
            alt={property.subject} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3 space-y-2">
            {property.featured && (
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
                Vedette
              </Badge>
            )}
            {property.forSale && (
              <Badge className="bg-gray-500 hover:bg-gray-600 text-white border-none block mt-2">
                À Vendre
              </Badge>
            )}
          </div>
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 hover:text-primary transition-colors">
            {property.subject}
          </h3>

          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin size={14} className="mr-1" />
            <span>{property.location}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <SquareIcon size={16} className="mr-1" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
            <div className="flex items-center">
              <span>{property.seller.type === "STORE" ? "Agent" : "Particulier"}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-lg">{formatPrice(property.price)}</span>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs border-gray-300 hover:bg-gray-100"
                onClick={toggleCompare}
              >
                {isCompared ? "Comparé" : "Comparer"}
              </Button>
              <Button 
                size="sm" 
                className="text-xs bg-white text-primary border border-primary hover:bg-primary hover:text-white"
              >
                Détails
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
