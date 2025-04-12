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
import { Search, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    
    // Fermer le menu mobile après la recherche
    setMobileMenuOpen(false);
  };
  
  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    setMobileMenuOpen(false);
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
    <div className={cn(
      "bg-white border-b w-full z-30 transition-all duration-300",
      sticky ? "sticky top-0 shadow-md" : ""
    )}>
      <div className="container mx-auto px-4">
        {isPropertyDetailPage ? (
          // Navigation pour la page détail propriété
          <div className="relative">
            {/* Menu burger mobile */}
            <div className="md:hidden flex justify-between items-center py-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 focus:outline-none flex items-center"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="ml-2 text-sm">Menu de navigation</span>
              </button>
            </div>
            
            {/* Navigation desktop et mobile */}
            <div className={cn(
              "transition-all duration-300 overflow-hidden",
              mobileMenuOpen ? "max-h-96" : "max-h-0 md:max-h-none"
            )}>
              <div className="hidden md:flex items-center justify-between py-2">
                <NavigationMenu>
                  <NavigationMenuList className="flex overflow-x-auto">
                    {menuItems.map((item) => (
                      <NavigationMenuItem key={item.id} className="px-1">
                        <button
                          onClick={() => handleMenuClick(item.id)}
                          className={cn(
                            "py-2 px-3 text-sm whitespace-nowrap",
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
              
              <div className="md:hidden py-2">
                <NavigationMenuList className="flex flex-col">
                  {menuItems.map((item) => (
                    <NavigationMenuItem key={item.id} className="px-1 mb-2">
                      <button
                        onClick={() => handleMenuClick(item.id)}
                        className={cn(
                          "py-2 px-3 text-sm whitespace-nowrap",
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
              </div>
            </div>
          </div>
        ) : (
          // Barre de recherche pour les autres pages
          <div className="relative">
            {/* Boutons Vente/Location toujours visibles et bouton toggle */}
            <div className="flex justify-between items-center py-3">
              <div className="flex space-x-2">
                <Button 
                  className={`${searchMode === "location" ? "bg-primary text-white" : "bg-mint text-darkblue hover:bg-mint/90"} px-3 py-1 h-9`}
                  onClick={() => setSearchMode("location")}
                >
                  Location
                </Button>
                <Button 
                  className={`${searchMode === "vente" ? "bg-primary text-white" : "bg-mint text-darkblue hover:bg-mint/90"} px-3 py-1 h-9`}
                  onClick={() => setSearchMode("vente")}
                >
                  Vente
                </Button>
              </div>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700 focus:outline-none flex items-center"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                <span className="ml-2 text-sm">Filtres</span>
              </button>
            </div>
            
            {/* Desktop: version normale, toujours visible */}
            <div className="hidden md:block pb-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-grow max-w-3xl bg-white rounded-lg shadow-sm border border-lightGray">
                  <div className="flex-grow p-2">
                    <Input 
                      type="text" 
                      placeholder="Adresse, ville, code postal..." 
                      className="border-0 h-10 focus:outline-none focus:ring-0 text-textColor"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="border-l border-lightGray p-2 w-48">
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
                  
                  <div className="border-l border-lightGray p-2 w-48">
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
            </div>
            
            {/* Mobile: version masquable */}
            <div className={cn(
              "md:hidden transition-all duration-300 overflow-hidden",
              mobileMenuOpen ? "max-h-96" : "max-h-0"
            )}>
              <div className="w-full flex flex-col pb-4 pt-2">
                <div className="flex-grow bg-white rounded-lg shadow-sm border border-lightGray flex flex-col">
                  <div className="p-2 w-full">
                    <Input 
                      type="text" 
                      placeholder="Adresse, ville, code postal..." 
                      className="border-0 h-10 focus:outline-none focus:ring-0 text-textColor w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="border-t border-lightGray p-2 w-full">
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="border-0 h-10 text-textColor w-full">
                        <SelectValue placeholder="Type de propriété" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="house">Maison</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="border-t border-lightGray p-2 w-full">
                    <Select value={searchLocation} onValueChange={setSearchLocation}>
                      <SelectTrigger className="border-0 h-10 text-textColor w-full">
                        <SelectValue placeholder="Localisation" />
                      </SelectTrigger>
                      <SelectContent>
                        {uniqueLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="p-2 flex w-full">
                    <Button 
                      type="button"
                      className="bg-primary text-white h-10 flex-grow rounded-md"
                      onClick={handleSearch}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Rechercher
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyNavbar;
