
import { Building, Users, Handshake, Award } from 'lucide-react';

const FeatureItem = ({ Icon, title }: { Icon: React.ElementType, title: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-sm font-medium text-center">{title}</h3>
    </div>
  );
};

const WorkTogetherSection = () => {
  const features = [
    { icon: Building, title: "Real Estate" },
    { icon: Users, title: "Community Work" },
    { icon: Handshake, title: "Strategic Partners" },
    { icon: Award, title: "Industry Leaders" },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Travaillons ensemble</h2>
          <p className="text-gray-500 text-sm md:text-base">Rejoindre la meilleure plateforme de biens immobiliers</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureItem key={index} Icon={feature.icon} title={feature.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkTogetherSection;
