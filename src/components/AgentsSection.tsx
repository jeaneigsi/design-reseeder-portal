import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  image: string;
  name: string;
  type: string;
  rating: number;
  id: number;
}

const AgentCard = ({ image, name, type, rating, id }: AgentCardProps) => {
  return (
    <div className="flex flex-col items-center hover:shadow-md rounded-lg p-4 transition-shadow duration-300">
      <Link to={`/agent/${id}`} className="flex flex-col items-center">
        <img src={image} alt={name} className="w-32 h-32 object-cover rounded-full mb-4" />
        <h3 className="font-bold text-lg mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{type}</p>
        <div className="flex items-center mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ))}
        </div>
      </Link>
      <Button variant="outline" className="text-xs">Contacter l'agent</Button>
    </div>
  );
};

const AgentsSection = () => {
  const agents = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Aminata Diallo",
      type: "Agent Commercial",
      rating: 4
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Kofi Mensah",
      type: "Agent Courtier",
      rating: 5
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Fatima Ouedraogo",
      type: "Agent Location",
      rating: 4
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1656313826909-1f89d1702a81?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Ibrahim Toure",
      type: "Agent Principal",
      rating: 5
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Notre equipe</h2>
          <p className="text-gray-500 text-sm md:text-base">De professionnels qualifiés</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} {...agent} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button className="bg-primary">Contacter tous les agents</Button>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;
