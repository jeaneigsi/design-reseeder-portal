import React, { useState } from 'react';

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export interface FilterOptions {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  propertyType?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  onFilterChange, 
  initialFilters = {}
}) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Convertir les valeurs numériques
    const numericFields = ['minPrice', 'maxPrice', 'minArea', 'maxArea'];
    const newValue = numericFields.includes(name) && value !== '' 
      ? parseFloat(value) 
      : value;
    
    const updatedFilters = {
      ...filters,
      [name]: newValue
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const emptyFilters = {} as FilterOptions;
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Filtrer les résultats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filtre de lieu */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Localisation
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={filters.location || ''}
            onChange={handleInputChange}
            placeholder="Ville ou région"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Filtres de prix */}
        <div className="mb-4">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Prix minimum (DH)
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice || ''}
            onChange={handleInputChange}
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Prix maximum (DH)
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice || ''}
            onChange={handleInputChange}
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Filtres de superficie */}
        <div className="mb-4">
          <label htmlFor="minArea" className="block text-sm font-medium text-gray-700 mb-1">
            Surface minimum (m²)
          </label>
          <input
            type="number"
            id="minArea"
            name="minArea"
            value={filters.minArea || ''}
            onChange={handleInputChange}
            placeholder="Min"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="maxArea" className="block text-sm font-medium text-gray-700 mb-1">
            Surface maximum (m²)
          </label>
          <input
            type="number"
            id="maxArea"
            name="maxArea"
            value={filters.maxArea || ''}
            onChange={handleInputChange}
            placeholder="Max"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Filtre de type de propriété */}
        <div className="mb-4">
          <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">
            Type de propriété
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les types</option>
            <option value="Terrain résidentiel">Terrain résidentiel</option>
            <option value="Terrain commercial">Terrain commercial</option>
            <option value="Terrain agricole">Terrain agricole</option>
            <option value="Terrain industriel">Terrain industriel</option>
            <option value="Terrain constructible">Terrain constructible</option>
            <option value="Terrain viabilisé">Terrain viabilisé</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mr-2 text-gray-700"
        >
          Réinitialiser
        </button>
        <button
          onClick={() => onFilterChange(filters)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Appliquer les filtres
        </button>
      </div>
    </div>
  );
};

export default FilterSection; 