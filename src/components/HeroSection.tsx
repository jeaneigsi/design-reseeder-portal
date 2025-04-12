import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [searchMode, setSearchMode] = useState<"vente" | "location">("vente");

  // Gérer la soumission de recherche
  const handleSearch = () => {
    // Construire les paramètres de recherche
    const params = new URLSearchParams();
    
    if (searchTerm) params.append("query", searchTerm);
    if (propertyType) params.append("type", propertyType);
    if (location) params.append("location", location);
    
    // Ajouter le mode de recherche comme filtre
    params.append("mode", searchMode);
    
    // Rediriger vers la page de propriétés avec les paramètres
    // Cette page existe et peut gérer les filtres et afficher "aucun résultat" si nécessaire
    navigate(`/property?${params.toString()}`);
  };

  // Extraire les locations uniques pour le dropdown
  const uniqueLocations = Array.from(new Set(parcelsData.map(parcel => parcel.location.split(', ')[0])));

  return (
    <section className="relative min-h-screen bg-cover bg-center" style={{backgroundImage: "url('src/assets/morrocco.jpeg')"}}> 
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="container relative mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-[1] pt-28 pb-32">
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4">Votre chemin vers la maison commence ici</h1>
        <p className="text-white text-lg mb-10 max-w-3xl">Des milliers de parcelles accessibles en un clic</p>
        
        <div className="flex space-x-3 mb-10">
          <Button 
            className={`rounded-full px-8 py-6 ${searchMode === "location" ? "bg-primary text-white" : "bg-white text-darkblue border-white hover:bg-gray-100"}`}
            onClick={() => setSearchMode("location")}
          >
            Location
          </Button>
          <Button 
            className={`rounded-full px-8 py-6 ${searchMode === "vente" ? "bg-primary text-white" : "bg-white text-darkblue border-white hover:bg-gray-100"}`}
            onClick={() => setSearchMode("vente")}
          >
            Vente
          </Button>
        </div>
        
        <div className="w-full max-w-4xl bg-white rounded-lg p-2 shadow-lg flex flex-col md:flex-row">
          <div className="flex-grow p-2 md:flex-1">
            <Input 
              type="text" 
              placeholder="Adresse, ville, code postal..." 
              className="border-0 h-12 focus:outline-none focus:ring-0 text-textColor"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:border-l border-lightGray p-2 md:flex-1">
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="border-0 h-12 text-textColor">
                <SelectValue placeholder="Type de propriété" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">Maison</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:border-l border-lightGray p-2 md:flex-1">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="border-0 h-12 text-textColor">
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
              className="bg-primary text-white h-12 w-12 rounded-md ml-2"
              onClick={handleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
