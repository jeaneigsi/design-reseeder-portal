import { Link } from "react-router-dom";
import { Parcel, formatPrice } from "@/data/parcelsData";
import usePropertyCard from "@/hooks/usePropertyCard";

// Import des sous-composants
import PropertyCardImage from "@/components/property/PropertyCardImage";
import PropertyCardDetails from "@/components/property/PropertyCardDetails";
import PropertyPreviewModal from "@/components/property/PropertyPreviewModal";

interface PropertyCardProps {
  property: Parcel;
  view?: "grid" | "list";
}

/**
 * Carte de propriété avec prévisualisation et fonctionnalités interactives
 */
const PropertyCard = ({ property, view = "grid" }: PropertyCardProps) => {
  // Utilisation du hook personnalisé pour gérer l'état et les interactions
  const {
    isFavorite,
    toggleFavorite,
    isHovered,
    currentImageIndex,
    showPreview,
    setShowPreview,
    previewImageIndex,
    setPreviewImageIndex,
    prevImage,
    nextImage,
    openPreview,
    handleMouseEnter,
    handleMouseLeave
  } = usePropertyCard();

  return (
    <>
      <Link 
        to={`/property/${property.id}`}
        className={`bg-white rounded-lg overflow-hidden group relative transition-all duration-300 transform hover:shadow-lg ${
          view === "list" ? "flex" : "block"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image avec galerie */}
        <PropertyCardImage 
          images={property.images}
          subject={property.subject}
          featured={property.featured}
          forSale={property.forSale}
          isHovered={isHovered}
          currentImageIndex={currentImageIndex}
          onPrevImage={prevImage}
          onNextImage={nextImage}
          onPreviewClick={openPreview}
          onFavoriteClick={toggleFavorite}
          isFavorite={isFavorite}
          view={view}
        />

        {/* Détails de la propriété */}
        <PropertyCardDetails 
          subject={property.subject}
          location={property.location}
          area={property.area}
          areaUnit={property.areaUnit}
          price={property.price}
          sellerType={property.seller.type}
          formatPrice={formatPrice}
          view={view}
        />
      </Link>

      {/* Modal de prévisualisation */}
      <PropertyPreviewModal 
        property={property}
        open={showPreview}
        onOpenChange={setShowPreview}
        previewImageIndex={previewImageIndex}
        setPreviewImageIndex={setPreviewImageIndex}
      />
    </>
  );
};

export default PropertyCard;
