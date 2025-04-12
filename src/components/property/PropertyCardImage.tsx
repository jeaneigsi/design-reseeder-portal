import React from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyCardImageProps {
  images: string[];
  subject: string;
  featured?: boolean;
  forSale?: boolean;
  isHovered: boolean;
  currentImageIndex: number;
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onPreviewClick: (e: React.MouseEvent) => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
  isFavorite: boolean;
  view?: 'grid' | 'list';
}

/**
 * Composant pour la partie image du PropertyCard
 */
const PropertyCardImage: React.FC<PropertyCardImageProps> = ({
  images,
  subject,
  featured,
  forSale,
  isHovered,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onPreviewClick,
  onFavoriteClick,
  isFavorite,
  view = 'grid'
}) => {
  return (
    <div className={`relative overflow-hidden ${view === 'list' ? 'w-1/3' : ''}`}>
      <AnimatePresence mode="wait">
        <motion.img 
          key={currentImageIndex}
          src={images[currentImageIndex]} 
          alt={subject} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>

      {/* Property tags */}
      <div className="absolute top-3 left-3 space-y-2">
        {featured && (
          <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black">En vedette</Badge>
        )}
        <Badge className={forSale ? "bg-primary" : "bg-blue-500"}>
          {forSale ? "À Vendre" : "À Louer"}
        </Badge>
      </div>

      {/* Favorite button */}
      <button 
        onClick={onFavoriteClick}
        className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={isFavorite ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={isFavorite ? 'text-red-500' : ''}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>

      {/* Image gallery navigation (only visible on hover) */}
      {isHovered && images.length > 1 && (
        <>
          <button 
            onClick={onPrevImage}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors z-10"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-10">
            {currentImageIndex + 1}/{images.length}
          </div>
          
          <button 
            onClick={onNextImage}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors z-10"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

      {/* Quick view button (only visible on hover) */}
      {isHovered && (
        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute bottom-3 right-3 bg-white/80 hover:bg-white z-10"
          onClick={onPreviewClick}
        >
          <Eye size={14} className="mr-1" />
          <span>Aperçu rapide</span>
        </Button>
      )}
    </div>
  );
};

export default PropertyCardImage; 