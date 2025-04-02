
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';

interface AgentCardProps {
  image: string;
  name: string;
  type: string;
  rating: number;
}

const AgentCard = ({ image, name, type, rating }: AgentCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <img src={image} alt={name} className="w-32 h-32 object-cover rounded-full mb-4" />
      <h3 className="font-bold text-lg mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-2">{type}</p>
      <div className="flex items-center mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <Button variant="outline" className="text-xs">Contact Agent</Button>
    </div>
  );
};

const AgentsSection = () => {
  const agents = [
    {
      image: "/placeholder.svg",
      name: "Olivia Johnson",
      type: "Sales Agent",
      rating: 4
    },
    {
      image: "/placeholder.svg",
      name: "Liam Wilson",
      type: "Broker Agent",
      rating: 5
    },
    {
      image: "/placeholder.svg",
      name: "Sophia Martinez",
      type: "Rental Agent",
      rating: 4
    },
    {
      image: "/placeholder.svg",
      name: "Noah Thompson",
      type: "Lead Agent",
      rating: 5
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Choose Your Local Agent</h2>
          <p className="text-gray-500 text-sm md:text-base">Our agents are highly qualified and ready to help you</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button className="bg-primary">Contact All Agents</Button>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
