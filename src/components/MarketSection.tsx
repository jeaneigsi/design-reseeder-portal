
const StatItem = ({ value, label }: { value: string, label: string }) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{value}</h3>
      <p className="text-white text-sm md:text-base">{label}</p>
    </div>
  );
};

const MarketSection = () => {
  return (
    <section 
      className="py-16 bg-cover bg-center text-white relative"
      style={{ 
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/placeholder.svg')" 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Vendre son bien au meilleurs prix</h2>
          <p className="text-sm md:text-base">Nous vous aidons à vendre au meilleur prix possible</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem value="26+" label="Years of Experience" />
          <StatItem value="4130" label="Properties Sold" />
          <StatItem value="98%" label="Client Satisfaction" />
          <StatItem value="1780" label="Awards Received" />
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
