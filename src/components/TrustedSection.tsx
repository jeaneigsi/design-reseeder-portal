
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
        <button className="text-xs text-primary">View Stats</button>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Trusted By 100+ Million Buyers</h2>
            <p className="text-gray-600 mb-6">Find out why we're trusted by millions of homebuyers</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard 
                Icon={Award}
                title="LARGE DATA"
                description="Market & Demographic Data"
                value="21M+ Homes"
              />
              <StatCard 
                Icon={ThumbsUp}
                title="HELPFUL AGENTS"
                description="On Market Information"
                value="3.5K+ Partners"
              />
              <StatCard 
                Icon={Star}
                title="5-STAR APP"
                description="iOS & Android Mobile Apps"
                value="1.4M+ Downloads"
              />
              <StatCard 
                Icon={Trophy}
                title="AWARD WINNING"
                description="Recognized for Excellence"
                value="40+ Awards"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-8 flex items-center justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Real estate agent" 
              className="max-w-full h-auto rounded-lg" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedSection;
