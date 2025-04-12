import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  LayoutGrid,
  List,
  Search,
  AlertCircle
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import PropertyCard from "@/components/PropertyCard";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import RealEstateAgentCTA from "@/components/RealEstateAgentCTA";
import PropertyNavbar from "@/components/PropertyNavbar";
import { parcelsData, Parcel } from "@/data/parcelsData";

const Property = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProperties, setFilteredProperties] = useState<Parcel[]>(parcelsData);
  const location = useLocation();

  // Paramètres de pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Filtre les propriétés en fonction des paramètres d'URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query")?.toLowerCase();
    const type = params.get("type");
    const locationParam = params.get("location");
    const mode = params.get("mode");

    let filtered = parcelsData;

    // Filtre par terme de recherche
    if (query) {
      filtered = filtered.filter(
        property => 
          property.subject.toLowerCase().includes(query) || 
          property.location.toLowerCase().includes(query) ||
          (property.description?.toLowerCase().includes(query) || false)
      );
    }

    // Filtre par type de propriété
    if (type) {
      filtered = filtered.filter(
        property => property.subject.toLowerCase().includes(type.toLowerCase())
      );
    }

    // Filtre par emplacement
    if (locationParam) {
      filtered = filtered.filter(
        property => property.location.includes(locationParam)
      );
    }

    // Filtre par mode (vente/location)
    if (mode === "vente") {
      filtered = filtered.filter(property => property.forSale === true);
    } else if (mode === "location") {
      filtered = filtered.filter(property => property.forSale !== true);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1); // Réinitialise la page à 1 lors d'un changement de filtre
  }, [location.search]);

  // Récupère les propriétés de la page courante
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Génère les éléments de pagination
  const renderPaginationItems = () => {
    const items = [];

    // Bouton précédent
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious 
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );

    // Première page
    items.push(
      <PaginationItem key="page-1">
        <PaginationLink 
          onClick={() => handlePageChange(1)}
          isActive={currentPage === 1}
          className="cursor-pointer"
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Pages intermédiaires
    if (totalPages > 5) {
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // Pages avant et après la page courante
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(
            <PaginationItem key={`page-${i}`}>
              <PaginationLink 
                onClick={() => handlePageChange(i)}
                isActive={currentPage === i}
                className="cursor-pointer"
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    } else {
      // Afficher toutes les pages si peu nombreuses
      for (let i = 2; i < totalPages; i++) {
        items.push(
          <PaginationItem key={`page-${i}`}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Dernière page (seulement s'il y a au moins 2 pages)
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={`page-${totalPages}`}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Bouton suivant
    items.push(
      <PaginationItem key="next">
        <PaginationNext 
          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      <BreadcrumbNav />
      <PropertyNavbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Toutes les propriétés</h1>
            <p className="text-gray-500">
              {filteredProperties.length} résultats trouvés • Page {currentPage} sur {totalPages}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Filtrer</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="sale">À Vendre</SelectItem>
                  <SelectItem value="rent">À Louer</SelectItem>
                  <SelectItem value="featured">En vedette</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Trier par</span>
              <Select defaultValue="default">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Défaut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Défaut</SelectItem>
                  <SelectItem value="price-high">Prix (Haut)</SelectItem>
                  <SelectItem value="price-low">Prix (Bas)</SelectItem>
                  <SelectItem value="newest">Plus récent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center border rounded-md overflow-hidden">
              <button 
                className={`p-2 ${view === 'grid' ? 'bg-primary text-white' : 'bg-white'}`} 
                onClick={() => setView('grid')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                className={`p-2 ${view === 'list' ? 'bg-primary text-white' : 'bg-white'}`} 
                onClick={() => setView('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Aucun résultat trouvé</AlertTitle>
              <AlertDescription>
                Aucune propriété ne correspond à vos critères de recherche. Veuillez modifier vos filtres.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard key={property.id} property={property} view={view} />
            ))}
          </div>
        )}
        
        {filteredProperties.length > 0 && (
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 sm:mb-0">
              Affichage de {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProperties.length)} sur {filteredProperties.length} résultats
            </p>
            
            <Pagination>
              <PaginationContent>
                {renderPaginationItems()}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      
      <RealEstateAgentCTA />
      <Footer />
    </div>
  );
};

export default Property;
