import { Home, Building2, Building, Warehouse, Castle, Compass, Mountain, Trees, Waves, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const PropertyTypeCard = ({ Icon, title, link }: { Icon: React.ElementType, title: string, link: string }) => {
  return (
    <Link to={link} className="flex flex-col items-center p-4 hover:shadow-md rounded-md transition-shadow duration-300 hover:bg-gray-50">
      <Icon className="h-8 w-8 text-gray-600 mb-2" />
      <span className="text-sm text-gray-700">{title}</span>
    </Link>
  );
};

const PropertyTypeSection = () => {
  const propertyTypes = [
    { icon: Home, title: "Maisons", param: "Houses" },
    { icon: Building2, title: "Appartements", param: "Apartment" },
    { icon: Building, title: "Bureaux", param: "Office" },
    { icon: Warehouse, title: "Industriel", param: "Industrial" },
    { icon: Castle, title: "Maison de ville", param: "Townhouse" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Type de propriété</h2>
        <p className="text-gray-500 text-sm md:text-base text-center mb-10">Trouvez votre terrain en selectionnant un type</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {propertyTypes.map((type, index) => (
            <PropertyTypeCard 
              key={index} 
              Icon={type.icon} 
              title={type.title} 
              link={`/property?type=${type.param}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeSection;
