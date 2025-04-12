import { useState } from "react";

interface UsePropertyCardOptions {
  initialImageIndex?: number;
}

interface UsePropertyCardResult {
  isFavorite: boolean;
  toggleFavorite: (e: React.MouseEvent) => void;
  isHovered: boolean;
  setIsHovered: (value: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (indexOrFn: number | ((prev: number) => number)) => void;
  showPreview: boolean;
  setShowPreview: (value: boolean) => void;
  previewImageIndex: number;
  setPreviewImageIndex: (indexOrFn: number | ((prev: number) => number)) => void;
  prevImage: (e: React.MouseEvent) => void;
  nextImage: (e: React.MouseEvent) => void;
  openPreview: (e: React.MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

/**
 * Hook personnalisé pour gérer l'état et les interactions du PropertyCard
 */
export function usePropertyCard(
  { initialImageIndex = 0 }: UsePropertyCardOptions = {}
): UsePropertyCardResult {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(initialImageIndex);
  
  // Toggle l'état des favoris
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  // Navigation dans la mini-galerie
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => prev + 1);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => prev - 1);
  };

  // Ouvre l'aperçu rapide
  const openPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewImageIndex(currentImageIndex);
    setShowPreview(true);
  };
  
  // Gestion du survol
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImageIndex(initialImageIndex);
  };
  
  return {
    isFavorite,
    toggleFavorite,
    isHovered,
    setIsHovered,
    currentImageIndex,
    setCurrentImageIndex,
    showPreview,
    setShowPreview,
    previewImageIndex,
    setPreviewImageIndex,
    prevImage,
    nextImage,
    openPreview,
    handleMouseEnter,
    handleMouseLeave
  };
}

export default usePropertyCard; 