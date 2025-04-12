import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Parcel } from '@/data/parcelsData';

interface UsePropertyFiltersOptions {
  initialProperties: Parcel[];
  initialSearchTerm?: string;
  initialPropertyType?: string;
  initialLocation?: string;
}

interface UsePropertyFiltersResult {
  filteredProperties: Parcel[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  searchLocation: string;
  setSearchLocation: (value: string) => void;
  resetFilters: () => void;
}

/**
 * Hook personnalisé pour gérer les filtres sur les propriétés
 * 
 * @param options - Options de filtrage
 * @returns Objet contenant les états et fonctions des filtres
 */
export const usePropertyFilters = ({
  initialProperties,
  initialSearchTerm = '',
  initialPropertyType = '',
  initialLocation = '',
}: UsePropertyFiltersOptions): UsePropertyFiltersResult => {
  const location = useLocation();
  const [properties] = useState<Parcel[]>(initialProperties);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [searchLocation, setSearchLocation] = useState(initialLocation);
  const [filteredProperties, setFilteredProperties] = useState<Parcel[]>(initialProperties);

  // Synchroniser les états avec les paramètres d'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Récupère les valeurs des paramètres d'URL
    const queryParam = params.get('query');
    const typeParam = params.get('type');
    const locationParam = params.get('location');
    
    // Met à jour l'état local avec les valeurs des paramètres
    if (queryParam) setSearchTerm(queryParam);
    if (typeParam) setPropertyType(typeParam);
    if (locationParam) setSearchLocation(locationParam);
    
    // Applique les filtres aux propriétés
    filterProperties();
  }, [location.search]);
  
  // Filtrer les propriétés en fonction des critères
  useEffect(() => {
    let results = [...properties];

    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(
        property => 
          property.subject.toLowerCase().includes(searchLower) || 
          property.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtre par type de propriété
    if (propertyType) {
      results = results.filter(property => {
        // Vérification si le type est présent dans les caractéristiques
        const hasFeature = property.features?.some(
          feature => feature.toLowerCase().includes(propertyType.toLowerCase())
        );
        // Vérification si le type est présent dans le sujet ou la description
        const inSubject = property.subject.toLowerCase().includes(propertyType.toLowerCase());
        const inDescription = property.description.toLowerCase().includes(propertyType.toLowerCase());
        
        return hasFeature || inSubject || inDescription;
      });
    }

    // Filtre par emplacement
    if (searchLocation) {
      results = results.filter(
        property => property.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    setFilteredProperties(results);
  }, [properties, searchTerm, propertyType, searchLocation]);

  // Réinitialiser tous les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setPropertyType('');
    setSearchLocation('');
  };

  return {
    filteredProperties,
    searchTerm,
    setSearchTerm,
    propertyType,
    setPropertyType,
    searchLocation,
    setSearchLocation,
    resetFilters
  };
};

export default usePropertyFilters; 