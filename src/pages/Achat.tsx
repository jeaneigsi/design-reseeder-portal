
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

const Achat = () => {
  const properties = [
    {
      id: 1,
      title: "Appartement moderne à Casablanca",
      address: "Anfa, Casablanca",
      price: 2500000,
      beds: 3,
      baths: 2,
      sqft: 120,
      image: "https://images.unsplash.com/photo-1560185007-5f0bb1866cab",
      featured: true,
      forSale: true
    },
    {
      id: 2,
      title: "Villa spacieuse à Marrakech",
      address: "Palmeraie, Marrakech",
      price: 4800000,
      beds: 5,
      baths: 4,
      sqft: 350,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      featured: true,
      forSale: true
    },
    {
      id: 3,
      title: "Riad traditionnel à Fès",
      address: "Médina, Fès",
      price: 3200000,
      beds: 4,
      baths: 3,
      sqft: 200,
      image: "https://images.unsplash.com/photo-1574739782594-db4ead9bb748",
      featured: false,
      forSale: true
    },
    {
      id: 4,
      title: "Appartement vue mer à Tanger",
      address: "Malabata, Tanger",
      price: 1800000,
      beds: 2,
      baths: 2,
      sqft: 90,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      featured: false,
      forSale: true
    },
    {
      id: 5,
      title: "Penthouse de luxe à Rabat",
      address: "Hay Riad, Rabat",
      price: 5500000,
      beds: 4,
      baths: 3,
      sqft: 220,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      featured: true,
      forSale: true
    },
    {
      id: 6,
      title: "Maison avec jardin à Agadir",
      address: "Founty, Agadir",
      price: 2200000,
      beds: 3,
      baths: 2,
      sqft: 150,
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
      featured: false,
      forSale: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="pt-20 flex-grow">
        <BreadcrumbNav />
        
        <div className="bg-gray-100 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Achat de propriétés au Maroc</h1>
            
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
                    <SelectItem value="house">Maison</SelectItem>
                    <SelectItem value="riad">Riad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-48">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">Jusqu'à 1M MAD</SelectItem>
                    <SelectItem value="2000000">Jusqu'à 2M MAD</SelectItem>
                    <SelectItem value="5000000">Jusqu'à 5M MAD</SelectItem>
                    <SelectItem value="10000000">Jusqu'à 10M MAD</SelectItem>
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
            <h2 className="text-xl font-semibold">Propriétés à vendre</h2>
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

export default Achat;
