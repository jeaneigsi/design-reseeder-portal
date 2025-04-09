
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Location = () => {
  const properties = [
    {
      id: 1,
      title: "Appartement meublé à Casablanca",
      address: "Gauthier, Casablanca",
      price: 9500,
      beds: 2,
      baths: 1,
      sqft: 85,
      image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf",
      featured: true,
      forSale: false
    },
    {
      id: 2,
      title: "Duplex moderne à Marrakech",
      address: "Guéliz, Marrakech",
      price: 12000,
      beds: 3,
      baths: 2,
      sqft: 130,
      image: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3",
      featured: true,
      forSale: false
    },
    {
      id: 3,
      title: "Studio au centre de Rabat",
      address: "Agdal, Rabat",
      price: 5000,
      beds: 1,
      baths: 1,
      sqft: 45,
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8b",
      featured: false,
      forSale: false
    },
    {
      id: 4,
      title: "Appartement vue mer à Tanger",
      address: "Corniche, Tanger",
      price: 8000,
      beds: 2,
      baths: 1,
      sqft: 90,
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c",
      featured: false,
      forSale: false
    },
    {
      id: 5,
      title: "Villa avec piscine à Essaouira",
      address: "Ghazoua, Essaouira",
      price: 15000,
      beds: 4,
      baths: 3,
      sqft: 220,
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      featured: true,
      forSale: false
    },
    {
      id: 6,
      title: "Appartement moderne à Fès",
      address: "Ville Nouvelle, Fès",
      price: 6500,
      beds: 2,
      baths: 1,
      sqft: 80,
      image: "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a5",
      featured: false,
      forSale: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="pt-20 flex-grow">
        <BreadcrumbNav />
        
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Location de propriétés au Maroc</h1>
            
            <div className="max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input placeholder="Rechercher par ville, quartier..." className="h-12" />
              </div>
              <div className="w-full md:w-48">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de bien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les biens</SelectItem>
                    <SelectItem value="apartment">Appartement</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="house">Maison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget / mois" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5000">Jusqu'à 5000 MAD</SelectItem>
                    <SelectItem value="10000">Jusqu'à 10000 MAD</SelectItem>
                    <SelectItem value="15000">Jusqu'à 15000 MAD</SelectItem>
                    <SelectItem value="20000">Jusqu'à 20000 MAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-12 gap-2">
                <Search size={18} />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Propriétés à louer</h2>
            <div className="flex items-center gap-2">
              <Filter size={18} />
              <span>Filtres</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <Pagination className="mt-10">
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
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Location;
