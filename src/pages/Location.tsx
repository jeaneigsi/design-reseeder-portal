
import { useState } from "react";
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
  Search
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
import PropertyCard from "@/components/PropertyCard";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import RealEstateAgentCTA from "@/components/RealEstateAgentCTA";
import { parcelsData, Parcel } from "@/data/parcelsData";

const Location = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter only properties that are not for sale (for rent)
  // Since we don't have a "forRent" flag explicitly, we'll assume properties without forSale=true are for rent
  const forRentProperties = parcelsData.filter(p => !p.forSale);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />
      <BreadcrumbNav />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Propriétés à Louer</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Filtrer</span>
              <Select>
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
            
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Trier par</span>
              <Select>
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forRentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">Affichage de 1-{forRentProperties.length} sur {forRentProperties.length} résultats</p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">20</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      <RealEstateAgentCTA />
      <Footer />
    </div>
  );
};

export default Location;
