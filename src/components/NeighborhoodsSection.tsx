
import { Button } from "@/components/ui/button";

interface NeighborhoodCardProps {
  image: string;
  name: string;
}

const NeighborhoodCard = ({ image, name }: NeighborhoodCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden group">
      <img src={image} alt={name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white font-bold text-xl">{name}</h3>
      </div>
    </div>
  );
};

const NeighborhoodsSection = () => {
  const neighborhoods = [
    {
      image: "/placeholder.svg",
      name: "Downtown"
    },
    {
      image: "/placeholder.svg",
      name: "City Center"
    },
    {
      image: "/placeholder.svg",
      name: "Riverside"
    },
    {
      image: "/placeholder.svg",
      name: "Beachfront"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore The Neighborhoods</h2>
          <p className="text-gray-500 text-sm md:text-base">Discover the best places to live across the country</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {neighborhoods.map((neighborhood, index) => (
            <NeighborhoodCard key={index} {...neighborhood} />
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
