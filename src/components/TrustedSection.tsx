
import { Award, ThumbsUp, Star, Trophy } from 'lucide-react';

const StatCard = ({ title, description, value, Icon }: { 
  title: string, 
  description: string, 
  value: string,
  Icon: React.ElementType 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-[#e3f4f2] flex items-center justify-center mr-4">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-sm">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-primary">{value}</span>
        <button className="text-xs text-primary">Voir Stats</button>
      </div>
    </div>
  );
};

const TrustedSection = () => {
  return (
    <section className="bg-mint py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Fait confiance par plus de 100 millions d'acheteurs</h2>
            <p className="text-gray-600 mb-6">Découvrez pourquoi nous sommes choisis par des millions d'acheteurs</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard 
                Icon={Award}
                title="GRANDE BASE DE DONNÉES"
                description="Données du marché & démographiques"
                value="21M+ Biens"
              />
              <StatCard 
                Icon={ThumbsUp}
                title="AGENTS QUALIFIÉS"
                description="Informations du marché"
                value="3.5K+ Partenaires"
              />
              <StatCard 
                Icon={Star}
                title="APP 5 ÉTOILES"
                description="Apps iOS & Android"
                value="1.4M+ Téléchargements"
              />
              <StatCard 
                Icon={Trophy}
                title="RÉCOMPENSÉ"
                description="Reconnu pour l'excellence"
                value="40+ Prix"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-8 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1527338611623-4e242563220a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Agent immobilier" 
              className="max-w-full h-auto rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
