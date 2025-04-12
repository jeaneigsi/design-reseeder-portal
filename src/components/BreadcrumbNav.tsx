import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronRight, Home, CornerDownLeft, Filter } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { parcelsData } from "@/data/parcelsData";

// Types de propriétés uniques
const propertyTypes = [
  { value: "terrain-constructible", label: "Terrain Constructible" },
  { value: "terrain-agricole", label: "Terrain Agricole" },
  { value: "terrain-commercial", label: "Terrain Commercial" },
  { value: "terrain-industriel", label: "Terrain Industriel" },
  { value: "terrain-residentiel", label: "Terrain Résidentiel" },
  { value: "parcelle-viabilisee", label: "Parcelle Viabilisée" },
];

// Villes uniques extraites des données
const cities = Array.from(
  new Set(
    parcelsData.map((p) => p.location.split(",")[0].trim())
  )
).sort().map(city => ({ value: city.toLowerCase(), label: city }));

const BreadcrumbNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [pathSegments, setPathSegments] = useState<Array<{ name: string; path: string; type?: string }>>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [propertyTitle, setPropertyTitle] = useState<string>("");

  useEffect(() => {
    const segments = [];
    const path = location.pathname;

    // Toujours ajouter l'accueil
    segments.push({ name: "Accueil", path: "/" });

    if (path.includes("/property")) {
      segments.push({ name: "Parcelles", path: "/property", type: "category" });

      // Si nous sommes sur une page de détail de propriété
      if (params.id) {
        const propertyId = parseInt(params.id);
        const property = parcelsData.find(p => p.id === propertyId);
        
        if (property) {
          // Ajouter le type de propriété
          const type = getPropertyType(property.subject);
          segments.push({ 
            name: type.label, 
            path: `/property?type=${type.value}`, 
            type: "propertyType" 
          });
          
          // Ajouter la région/ville
          const city = property.location.split(",")[0].trim();
          segments.push({ 
            name: city, 
            path: `/property?location=${city.toLowerCase()}`, 
            type: "location" 
          });
          
          // Ajouter le titre de la propriété
          setPropertyTitle(property.subject);
          segments.push({ 
            name: property.subject, 
            path: `/property/${property.id}`,
            type: "property" 
          });
        }
      }
    } else if (path.includes("/achat")) {
      segments.push({ name: "À Vendre", path: "/achat", type: "category" });
      
      // Extraire les paramètres de l'URL
      const searchParams = new URLSearchParams(location.search);
      const type = searchParams.get("type");
      const locationParam = searchParams.get("location");
      
      if (type) {
        const propertyType = propertyTypes.find(t => t.value === type);
        if (propertyType) {
          segments.push({ 
            name: propertyType.label, 
            path: `/achat?type=${type}`, 
            type: "propertyType" 
          });
        }
      }
      
      if (locationParam) {
        const city = cities.find(c => c.value === locationParam);
        if (city) {
          segments.push({ 
            name: city.label, 
            path: type 
              ? `/achat?type=${type}&location=${locationParam}` 
              : `/achat?location=${locationParam}`, 
            type: "location" 
          });
        }
      }
    } else if (path.includes("/location")) {
      segments.push({ name: "À Louer", path: "/location", type: "category" });
      
      // Extraire les paramètres de l'URL
      const searchParams = new URLSearchParams(location.search);
      const type = searchParams.get("type");
      const locationParam = searchParams.get("location");
      
      if (type) {
        const propertyType = propertyTypes.find(t => t.value === type);
        if (propertyType) {
          segments.push({ 
            name: propertyType.label, 
            path: `/location?type=${type}`, 
            type: "propertyType" 
          });
        }
      }
      
      if (locationParam) {
        const city = cities.find(c => c.value === locationParam);
        if (city) {
          segments.push({ 
            name: city.label, 
            path: type 
              ? `/location?type=${type}&location=${locationParam}` 
              : `/location?location=${locationParam}`, 
            type: "location" 
          });
        }
      }
    } else if (path.includes("/contact")) {
      segments.push({ name: "Contact", path: "/contact" });
    }

    setPathSegments(segments);
  }, [location, params]);

  // Déterminer le type de propriété à partir du sujet
  const getPropertyType = (subject: string) => {
    const subjectLower = subject.toLowerCase();
    
    if (subjectLower.includes("constructible")) {
      return propertyTypes[0];
    } else if (subjectLower.includes("agricole")) {
      return propertyTypes[1];
    } else if (subjectLower.includes("commercial")) {
      return propertyTypes[2];
    } else if (subjectLower.includes("industriel") || subjectLower.includes("industrielle")) {
      return propertyTypes[3];
    } else if (subjectLower.includes("résidentiel")) {
      return propertyTypes[4];
    } else if (subjectLower.includes("viabilisée")) {
      return propertyTypes[5];
    } else {
      return propertyTypes[0]; // Défaut: terrain constructible
    }
  };

  // Construire l'URL avec les filtres
  const applyFilters = () => {
    let baseUrl = location.pathname.includes("/achat") 
      ? "/achat" 
      : location.pathname.includes("/location") 
        ? "/location" 
        : "/property";
    
    const params = new URLSearchParams();
    if (filterType) params.append("type", filterType);
    if (filterLocation) params.append("location", filterLocation);
    
    const queryString = params.toString();
    navigate(`${baseUrl}${queryString ? `?${queryString}` : ""}`);
  };

  // Retourner à la liste avec le contexte
  const backToList = () => {
    let baseUrl = location.pathname.includes("/property/") 
      ? "/property" 
      : location.pathname;
    
    // Conserver les paramètres actuels
    navigate(baseUrl + location.search);
  };
  
  return (
    <nav className="bg-gray-100 border-b border-gray-200 p-4 relative">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="flex items-center text-sm md:text-base overflow-x-auto pb-1 flex-grow scrollbar-hide">
          {pathSegments.map((segment, index) => (
            <div key={index} className="flex items-center whitespace-nowrap">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
              
              {index === 0 ? (
                <Link 
                  to={segment.path} 
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <Home className="h-4 w-4 mr-1" />
                  <span>{segment.name}</span>
          </Link>
              ) : segment.type === "propertyType" || segment.type === "location" ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center text-gray-600 hover:text-primary transition-colors group">
                      <span>{segment.name}</span>
                      <Filter className="h-3.5 w-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-4" align="start">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm">Filtrer par {segment.type === "propertyType" ? "type" : "ville"}</h4>
                      {segment.type === "propertyType" ? (
                        <Select 
                          value={filterType} 
                          onValueChange={setFilterType}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Tous les types</SelectItem>
                            {propertyTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Select 
                          value={filterLocation} 
                          onValueChange={setFilterLocation}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sélectionner une ville" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Toutes les villes</SelectItem>
                            {cities.map(city => (
                              <SelectItem key={city.value} value={city.value}>
                                {city.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={applyFilters}
                      >
                        Appliquer le filtre
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : index === pathSegments.length - 1 && segment.type === "property" ? (
                <span className="text-gray-700 font-medium truncate max-w-[280px]">
                  {propertyTitle}
                </span>
              ) : (
                <Link 
                  to={segment.path} 
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  {segment.name}
          </Link>
          )}
            </div>
          ))}
        </div>
        
        {params.id && (
          <button 
            onClick={backToList}
            className="ml-auto flex items-center text-primary hover:text-primary-dark transition-colors text-sm"
          >
            <CornerDownLeft className="h-4 w-4 mr-1" />
            <span>Retour à la liste</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbNav;
