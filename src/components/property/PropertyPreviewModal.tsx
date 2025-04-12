import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Parcel, formatPrice } from '@/data/parcelsData';

interface PropertyPreviewModalProps {
  property: Parcel;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewImageIndex: number;
  setPreviewImageIndex: (index: number) => void;
}

/**
 * Composant pour la modal de prévisualisation d'une propriété
 */
const PropertyPreviewModal: React.FC<PropertyPreviewModalProps> = ({
  property,
  open,
  onOpenChange,
  previewImageIndex,
  setPreviewImageIndex
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{property.subject}</DialogTitle>
        </DialogHeader>
        
        <div className="relative h-96">
          <img 
            src={property.images[previewImageIndex]} 
            alt={property.subject}
            className="w-full h-full object-contain bg-gray-100"
          />
          
          {/* Navigation buttons */}
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
            onClick={() => setPreviewImageIndex(prev => 
              prev === 0 ? property.images.length - 1 : prev - 1
            )}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
            onClick={() => setPreviewImageIndex(prev => 
              prev === property.images.length - 1 ? 0 : prev + 1
            )}
          >
            <ChevronRight size={20} />
          </button>
          
          {/* Image counter and dots */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center">
            <div className="flex space-x-2 mb-2">
              {property.images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === previewImageIndex ? "bg-white" : "bg-white/40"
                  }`}
                  onClick={() => setPreviewImageIndex(idx)}
                />
              ))}
            </div>
            <div className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              {previewImageIndex + 1}/{property.images.length}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="font-semibold">{property.subject}</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-primary font-bold">{formatPrice(property.price)}</div>
              <div className="text-gray-500 text-sm">
                {property.forSale ? "À Vendre" : "À Louer"}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-gray-500">Surface:</span>
              <span className="ml-2 font-medium">{property.area} {property.areaUnit}</span>
            </div>
            <div>
              <span className="text-gray-500">Type:</span>
              <span className="ml-2 font-medium">
                {property.seller.type === "STORE" ? "Professionnel" : "Particulier"}
              </span>
            </div>
            {property.createdAt && (
              <div>
                <span className="text-gray-500">Date d'ajout:</span>
                <span className="ml-2 font-medium">{property.createdAt}</span>
              </div>
            )}
          </div>
          
          <Link 
            to={`/property/${property.id}`}
            className="block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Voir les détails complets
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyPreviewModal; 