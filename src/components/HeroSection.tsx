
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

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2600&auto=format&fit=crop')"}}> 
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container relative mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-[1] pt-28 pb-32">
        <h1 className="text-5xl md:text-6xl text-white font-bold mb-4">Your Way Home Starts Here</h1>
        <p className="text-white text-lg mb-10 max-w-3xl">Thousands of luxury home enthusiasts just like you visit our website.</p>
        
        <div className="flex space-x-3 mb-10">
          <Button className="bg-primary text-white rounded-full px-8 py-6">For Rent</Button>
          <Button variant="outline" className="bg-white text-black border-white hover:bg-gray-100 hover:text-black rounded-full px-8 py-6">For Sale</Button>
        </div>
        
        <div className="w-full max-w-4xl bg-white rounded-lg p-2 shadow-lg flex flex-col md:flex-row">
          <div className="flex-grow p-2 md:flex-1">
            <Input 
              type="text" 
              placeholder="Address, City, ZIP..." 
              className="border-0 h-12 focus:outline-none focus:ring-0"
            />
          </div>
          
          <div className="md:border-l border-gray-200 p-2 md:flex-1">
            <Select>
              <SelectTrigger className="border-0 h-12">
                <SelectValue placeholder="Property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:border-l border-gray-200 p-2 md:flex-1">
            <Select>
              <SelectTrigger className="border-0 h-12">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="los-angeles">Los Angeles</SelectItem>
                <SelectItem value="chicago">Chicago</SelectItem>
                <SelectItem value="miami">Miami</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="p-2 flex items-center">
            <Button 
              type="button"
              className="bg-primary text-white h-12 w-12 rounded-md ml-2"
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
