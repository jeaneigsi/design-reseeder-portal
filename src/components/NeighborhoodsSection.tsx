import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface NeighborhoodCardProps {
  image: string;
  name: string;
  link: string;
}

const NeighborhoodCard = ({ image, name, link }: NeighborhoodCardProps) => {
  return (
    <Link to={link} className="relative rounded-lg overflow-hidden group block">
      <img src={image} alt={name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
        <h3 className="text-white font-bold text-xl">{name}</h3>
      </div>
    </Link>
  );
};

const NeighborhoodsSection = () => {
  const neighborhoods = [
    {
      image: "https://images.unsplash.com/photo-1570029604322-77c356acea7f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Rabat"
    },
    {
      image: "https://images.unsplash.com/photo-1690298552540-e0caa713ebc1?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Casablanca"
    },
    {
      image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Marrakech"
    },
    {
      image: "https://images.unsplash.com/photo-1505868067580-817d09206bed?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Tanger"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explorer les offres</h2>
          <p className="text-gray-500 text-sm md:text-base">Decouvrir les parcelles avec promotions</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((neighborhood, index) => (
            <NeighborhoodCard 
              key={index} 
              {...neighborhood} 
              link={`/property?location=${neighborhood.name}`}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">2</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">3</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodsSection;
