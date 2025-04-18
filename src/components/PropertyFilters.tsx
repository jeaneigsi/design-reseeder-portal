import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutGrid, List, Search } from "lucide-react";

interface PropertyFiltersProps {
  title: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  filterOptions?: {
    id: string;
    name: string;
    options: Array<{ value: string; label: string }>;
    defaultValue: string;
  }[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

const PropertyFilters = ({
  title,
  totalResults,
  currentPage,
  totalPages,
  view,
  onViewChange,
  filterOptions = [],
  searchPlaceholder = "Rechercher une propriété...",
  onSearch
}: PropertyFiltersProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  // Récupère les paramètres actuels de l'URL
  const searchParams = new URLSearchParams(location.search);
  
  const handleFilterChange = (value: string, filterId: string) => {
    if (value === "all") {
      searchParams.delete(filterId);
    } else {
      searchParams.set(filterId, value);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
      return;
    }
    
    if (searchTerm.trim() === "") {
      searchParams.delete("query");
    } else {
      searchParams.set("query", searchTerm);
    }
    searchParams.set("page", "1"); // Réinitialise à la première page lors d'une recherche
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col justify-between mb-8 flex-wrap gap-4">
      {/* Titre et compteur - visible sur tous les écrans */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
        <p className="hidden sm:block text-gray-500">
          {totalResults} résultats trouvés • Page {currentPage} sur {totalPages}
        </p>
      </div>
      
      {/* Zone de recherche et filtres */}
      <div className="flex flex-col w-full gap-4">
        {/* Formulaire de recherche - visible sur tous les écrans */}
        <form onSubmit={handleSearch} className="flex w-full">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              className="pl-10 pr-4 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </div>
          </div>
          <Button type="submit" variant="default" className="ml-2">
            Rechercher
          </Button>
        </form>

        {/* Options de filtrage et d'affichage */}
        <div className="flex justify-between items-center w-full">
          {/* Les filtres - masqués sur mobile, visibles à partir de sm */}
          <div className="hidden sm:flex items-center space-x-4 flex-wrap gap-y-2">
            {filterOptions.map(filter => (
              <div key={filter.id} className="flex items-center">
                <span className="mr-2 text-gray-600">{filter.name}</span>
                <Select 
                  defaultValue={filter.defaultValue}
                  onValueChange={(value) => handleFilterChange(value, filter.id)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder={filter.options.find(opt => opt.value === filter.defaultValue)?.label || "Tous"} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          
          {/* Boutons de vue - visibles sur tous les écrans */}
          <div className="flex items-center border rounded-md overflow-hidden ml-auto">
            <button 
              className={`p-2 ${view === 'grid' ? 'bg-primary text-white' : 'bg-white'}`} 
              onClick={() => onViewChange('grid')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`p-2 ${view === 'list' ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => onViewChange('list')}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters; 