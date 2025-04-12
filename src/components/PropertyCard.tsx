import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Heart, SquareIcon, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Parcel, formatPrice } from "@/data/parcelsData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface PropertyCardProps {
  property: Parcel;
  view?: "grid" | "list";
}

const PropertyCard = ({ property, view = "grid" }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);
  
  // Toggle favorite state
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  // Navigation dans la mini-galerie
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Ouvre l'aperçu rapide
  const openPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewImageIndex(currentImageIndex);
    setShowPreview(true);
  };

  return (
    <>
      <Link 
        to={`/property/${property.id}`}
        className={`bg-white rounded-lg overflow-hidden group relative transition-all duration-300 transform hover:shadow-lg ${
          view === "list" ? "flex" : "block"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImageIndex(0);
        }}
      >
        {/* Image container */}
        <div className={`relative overflow-hidden ${view === "list" ? "w-1/3" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              src={property.images[currentImageIndex]} 
              alt={property.subject} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Property tags */}
          <div className="absolute top-3 left-3 space-y-2">
            {property.featured && (
              <Badge className="bg-yellow-400 hover:bg-yellow-500 text-black">En vedette</Badge>
            )}
            <Badge className={property.forSale ? "bg-primary" : "bg-blue-500"}>
              {property.forSale ? "À Vendre" : "À Louer"}
            </Badge>
          </div>

          {/* Favorite button */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center z-10"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Image gallery navigation (only visible on hover) */}
          {isHovered && property.images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors z-10"
              >
                <ChevronLeft size={16} />
              </button>
              
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-xs z-10">
                {currentImageIndex + 1}/{property.images.length}
              </div>
              
              <button 
                onClick={nextImage}
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
              onClick={openPreview}
            >
              <Eye size={14} className="mr-1" />
              <span>Aperçu rapide</span>
            </Button>
          )}
        </div>

        {/* Property details */}
        <div className={`p-4 ${view === "list" ? "w-2/3" : ""}`}>
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
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
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {property.seller.type === "STORE" ? "Professionnel" : "Particulier"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-lg">{formatPrice(property.price)}</span>
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
      </Link>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
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
    </>
  );
};

export default PropertyCard;
