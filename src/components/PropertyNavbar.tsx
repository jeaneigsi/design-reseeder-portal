import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { parcelsData } from "@/data/parcelsData";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const PropertyNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sticky, setSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchMode, setSearchMode] = useState<"vente" | "location">("vente");
  
  // Extraire les locations uniques pour le dropdown
  const uniqueLocations = Array.from(new Set(parcelsData.map(parcel => parcel.location.split(', ')[0])));
  
  // Menu items for property detail page
  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'property-details', label: 'Détails de la propriété' },
    { id: 'amenities', label: 'Commodités' },
    { id: 'location', label: 'Emplacement' },
    { id: 'floor-plans', label: 'Plans d\'étage' },
    { id: 'reviews', label: 'Avis' },
    { id: 'similar', label: 'Propriétés similaires' }
  ];

  // Handle scroll to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll to section when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
          setActiveMenu(hash);
        }
      }
    };

    // Initial check for hash on load
    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Gérer la soumission de recherche
  const handleSearch = () => {
    // Construire les paramètres de recherche
    const params = new URLSearchParams();
    
    if (searchTerm) params.append("query", searchTerm);
    if (propertyType) params.append("type", propertyType);
    if (searchLocation) params.append("location", searchLocation);
    params.append("mode", searchMode);
    
    // Rediriger vers la page de propriétés avec les paramètres
    navigate(`/property?${params.toString()}`);
  };
  
  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  // Vérifier si on est sur la page détail de propriété
  const isPropertyDetailPage = location.pathname.includes('/property/');
  
  // Si nous ne sommes pas sur une page de propriété ou une page qui devrait avoir la barre de recherche
  if (!isPropertyDetailPage && 
      !location.pathname.includes('/achat') && 
      !location.pathname.includes('/location') && 
      !location.pathname.includes('/property')) {
    return null;
  }
  
  return (
    <div className={cn("bg-white border-b w-full z-10 transition-all duration-300", sticky ? "sticky top-0 shadow-md" : "")}>
      <div className="container mx-auto px-4">
        {isPropertyDetailPage ? (
          // Navigation pour la page détail propriété
          <div className="flex items-center justify-between py-2">
            <NavigationMenu>
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.id} className="px-1">
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={cn(
                        "py-2 px-3 text-sm",
                        activeMenu === item.id
                          ? "text-primary font-semibold"
                          : "text-textColor hover:text-primary"
                      )}
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        ) : (
          // Barre de recherche pour les autres pages
          <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <Button 
                className={`${searchMode === "location" ? "bg-primary text-white" : "bg-mint text-darkblue hover:bg-mint/90"}`}
                onClick={() => setSearchMode("location")}
              >
                Location
              </Button>
              <Button 
                className={`${searchMode === "vente" ? "bg-primary text-white" : "bg-mint text-darkblue hover:bg-mint/90"}`}
                onClick={() => setSearchMode("vente")}
              >
                Vente
              </Button>
            </div>
            
            <div className="w-full md:w-auto flex flex-grow max-w-3xl bg-white rounded-lg shadow-sm border border-lightGray flex-col md:flex-row">
              <div className="flex-grow p-2 md:flex-1">
                <Input 
                  type="text" 
                  placeholder="Adresse, ville, code postal..." 
                  className="border-0 h-10 focus:outline-none focus:ring-0 text-textColor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="md:border-l border-lightGray p-2 md:flex-1">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="border-0 h-10 text-textColor">
                    <SelectValue placeholder="Type de propriété" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="terrain">Terrain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:border-l border-lightGray p-2 md:flex-1">
                <Select value={searchLocation} onValueChange={setSearchLocation}>
                  <SelectTrigger className="border-0 h-10 text-textColor">
                    <SelectValue placeholder="Localisation" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-2 flex items-center">
                <Button 
                  type="button"
                  className="bg-primary text-white h-10 w-10 rounded-md ml-2"
                  onClick={handleSearch}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyNavbar;
