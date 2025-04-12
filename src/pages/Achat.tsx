import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  SquareIcon,
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
import { parcelsData, Parcel, formatPrice } from "@/data/parcelsData";

// Composant pour afficher la liste des propriétés
const PropertyList = ({ properties }: { properties: Parcel[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {properties.map((property) => (
        <Link 
          key={property.id}
          to={`/property/${property.id}`}
          className="group border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
        >
          <div className="relative">
            <img 
              src={property.images[0]} 
              alt={property.subject} 
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              {property.forSale ? (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-md">À Vendre</span>
              ) : (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">À Louer</span>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-1 truncate group-hover:text-primary transition-colors">{property.subject}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="text-primary font-bold mb-3 text-lg">{formatPrice(property.price)}</div>
            <div className="flex justify-between items-center text-xs text-gray-600 pt-3 border-t">
              <div className="flex items-center">
                <SquareIcon className="h-4 w-4 mr-1" />
                <span>{property.area} {property.areaUnit}</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 rounded-full">
                {property.seller.type === "STORE" ? "Professionnel" : "Particulier"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Achat = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter only properties that are for sale
  const forSaleProperties = parcelsData.filter(p => p.forSale);
  
  // Paramètres de pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(forSaleProperties.length / itemsPerPage);

  // Récupère les propriétés de la page courante
  const currentProperties = forSaleProperties.slice(
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
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Propriétés à Vendre</h1>
            <p className="text-gray-500">
              {forSaleProperties.length} résultats trouvés • Page {currentPage} sur {totalPages}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 flex-wrap gap-y-2">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Filtrer</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="featured">En vedette</SelectItem>
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
            
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-md w-[200px]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Property Grid */}
        {forSaleProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Aucun résultat trouvé</AlertTitle>
              <AlertDescription>
                Aucune propriété à vendre ne correspond à vos critères de recherche.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <PropertyList properties={currentProperties} />
        )}
        
        {/* Pagination */}
        {forSaleProperties.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 sm:mb-0">
              Affichage de {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, forSaleProperties.length)} sur {forSaleProperties.length} résultats
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

export default Achat;
