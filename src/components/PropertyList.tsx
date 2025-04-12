import { Link } from "react-router-dom";
import { MapPin, SquareIcon } from "lucide-react";
import { Parcel, formatPrice } from "@/data/parcelsData";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";

interface PropertyListProps {
  properties: Parcel[];
  view: "grid" | "list";
}

const PropertyList = ({ properties, view }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 px-4 border rounded-lg bg-white">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            Aucune propriété trouvée
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Essayez de modifier vos filtres de recherche.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${view === "grid" 
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      : "flex flex-col space-y-4"} mb-8`}
    >
      {properties.map((property) => (
        <Link 
          key={property.id}
          to={`/property/${property.id}`}
          className={`group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white ${
            view === "list" ? "flex flex-col md:flex-row" : ""
          }`}
        >
          <div className={`relative ${view === "list" ? "md:w-1/3" : ""}`}>
            <img 
              src={property.images[0]} 
              alt={property.subject} 
              className={`${
                view === "grid" ? "w-full h-48" : "w-full h-48 md:h-full"
              } object-cover group-hover:scale-105 transition-transform duration-500`}
            />
            <div className="absolute top-3 left-3">
              {property.forSale ? (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-md">À Vendre</span>
              ) : (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">À Louer</span>
              )}
            </div>
            {property.featured && (
              <div className="absolute top-3 right-3">
                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-md">En vedette</span>
              </div>
            )}
          </div>
          <div className={`p-4 ${view === "list" ? "md:w-2/3" : ""}`}>
            <h3 className="font-semibold mb-1 truncate group-hover:text-primary transition-colors">{property.subject}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="text-primary font-bold mb-3 text-lg">{formatPrice(property.price)}</div>
            
            {view === "list" && property.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>
            )}
            <div className="flex justify-between items-center text-xs text-gray-600 pt-3 border-t">
              <div className="flex items-center">
                <SquareIcon className="h-4 w-4 mr-1" />
                <span>{property.area} {property.areaUnit}</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {property.seller.type === "STORE" ? "Professionnel" : "Particulier"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PropertyList; 