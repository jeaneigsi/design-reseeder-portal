
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const RealEstateAgentCTA = () => {
  const [location, setLocation] = useState("");
  
  return (
    <section className="bg-orange-500 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center mb-6 lg:mb-0">
            <div className="w-24 h-24 bg-white rounded-full flex-shrink-0 flex items-center justify-center mr-0 md:mr-6 mb-4 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200" 
                alt="Agent" 
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Find a Local Real Estate Agent Today</h3>
              <p className="text-white/90">If you're looking to buy or sell a home, we'll help you make the most money possible.</p>
            </div>
          </div>
          
          <div className="w-full lg:w-auto">
            <div className="relative">
              <Input 
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Find your location agent"
                className="pl-3 pr-10 py-2 rounded-md w-full lg:w-64 text-gray-800 border-none"
              />
              <Button 
                type="button"
                className="absolute right-0 top-0 bottom-0 bg-transparent hover:bg-transparent text-gray-500"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealEstateAgentCTA;
