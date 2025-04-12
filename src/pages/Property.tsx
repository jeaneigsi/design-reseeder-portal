import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import RealEstateAgentCTA from "@/components/RealEstateAgentCTA";
import PropertyNavbar from "@/components/PropertyNavbar";
import { parcelsData, Parcel } from "@/data/parcelsData";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyList from "@/components/PropertyList";
import PaginationControls from "@/components/PaginationControls";

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
    const featured = params.get("featured") === "true";
    const pageParam = params.get("page");

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

    // Filtre pour les propriétés en vedette
    if (featured) {
      filtered = filtered.filter(property => property.featured === true);
    }

    setFilteredProperties(filtered);
    
    // Mise à jour de la page courante si spécifiée dans l'URL
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      } else {
        setCurrentPage(1);
      }
    } else {
      setCurrentPage(1);
    }
  }, [location.search]);

  // Récupère les propriétés de la page courante
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Gestion du changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(location.search);
    params.set("page", page.toString());
    window.history.replaceState({}, "", `${location.pathname}?${params.toString()}`);
  };

  // Options de filtrage
  const filterOptions = [
    {
      id: "mode",
      name: "Type",
      options: [
        { value: "all", label: "Tous" },
        { value: "vente", label: "À Vendre" },
        { value: "location", label: "À Louer" }
      ],
      defaultValue: "all"
    },
    {
      id: "featured",
      name: "Afficher",
      options: [
        { value: "all", label: "Tous" },
        { value: "true", label: "En vedette" }
      ],
      defaultValue: "all"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      <BreadcrumbNav />
      <PropertyNavbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <PropertyFilters 
          title="Toutes les propriétés"
          totalResults={filteredProperties.length}
          currentPage={currentPage}
          totalPages={totalPages}
          view={view}
          onViewChange={setView}
          filterOptions={filterOptions}
          searchPlaceholder="Rechercher une propriété..."
        />
        
        {filteredProperties.length > 0 ? (
          <>
            <PropertyList properties={currentProperties} view={view} />
            
            <PaginationControls 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <Alert className="mb-8 border-amber-500 text-amber-800 bg-amber-50">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Aucune propriété trouvée</AlertTitle>
            <AlertDescription>
              Aucune propriété ne correspond à vos critères de recherche. 
              Essayez d'élargir votre recherche ou de modifier vos filtres.
            </AlertDescription>
          </Alert>
        )}
        
        <RealEstateAgentCTA />
      </div>
      
      <Footer />
    </div>
  );
};

export default Property;
