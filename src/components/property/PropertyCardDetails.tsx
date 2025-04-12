import React from 'react';
import { MapPin, SquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Price } from '@/data/parcelsData';

interface PropertyCardDetailsProps {
  subject: string;
  location: string;
  area?: number;
  areaUnit?: string;
  price: Price;
  sellerType: 'STORE' | 'INDIVIDUAL';
  formatPrice: (price: Price) => string;
  view?: 'grid' | 'list';
}

/**
 * Composant pour la partie détails du PropertyCard
 */
const PropertyCardDetails: React.FC<PropertyCardDetailsProps> = ({
  subject,
  location,
  area,
  areaUnit,
  price,
  sellerType,
  formatPrice,
  view = 'grid'
}) => {
  return (
    <div className={`p-4 ${view === "list" ? "w-2/3" : ""}`}>
      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
        {subject}
      </h3>

      <div className="flex items-center text-gray-500 text-sm mb-3">
        <MapPin size={14} className="mr-1" />
        <span>{location}</span>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <SquareIcon size={16} className="mr-1" />
          <span>{area} {areaUnit}</span>
        </div>
        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
          {sellerType === "STORE" ? "Professionnel" : "Particulier"}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-primary font-bold text-lg">{formatPrice(price)}</span>
        {!view || view === "grid" ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-dark hover:bg-primary/10"
          >
            Détails
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default PropertyCardDetails; 