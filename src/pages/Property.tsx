import { useState } from "react";
import { Link } from "react-router-dom";
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
  Bed, 
  Bath, 
  SquareIcon, 
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  List
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
import PropertyNavbar from "@/components/PropertyNavbar";

interface PropertyData {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  featured: boolean;
  forSale: boolean;
}

const Property = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  const properties: PropertyData[] = [
    {
      id: 1,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      featured: true,
      forSale: true
    },
    {
      id: 2,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
      featured: true,
      forSale: true
    },
    {
      id: 3,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      featured: true,
      forSale: true
    },
    {
      id: 4,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      featured: true,
      forSale: true
    },
    {
      id: 5,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      featured: true,
      forSale: true
    },
    {
      id: 6,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1560184897-ae75f418493e",
      featured: true,
      forSale: true
    },
    {
      id: 7,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e",
      featured: true,
      forSale: true
    },
    {
      id: 8,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
      featured: true,
      forSale: true
    },
    {
      id: 9,
      title: "Elegant studio flat",
      address: "102 Ingraham St, Brooklyn, NY 11237",
      price: 8600,
      beds: 3,
      baths: 3,
      sqft: 4243,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      featured: true,
      forSale: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <BreadcrumbNav />
      <PropertyNavbar />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Property listing</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">Filter</span>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
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
              <span className="mr-2 text-gray-600">Sort by</span>
              <Select>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-high">Price (High)</SelectItem>
                  <SelectItem value="price-low">Price (Low)</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">Showing 1-9 of 42 results</p>
          
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
    </div>
  );
};

export default Property;
