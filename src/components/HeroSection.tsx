
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-cover bg-center pt-16" style={{backgroundImage: "url('/lovable-uploads/277d9cec-9502-459e-8afb-333b5767c215.png')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="container relative mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-[1] pt-20 pb-32">
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">Your Way Home Starts Here</h1>
        <div className="flex space-x-2 mb-8">
          <Button className="bg-primary">BUY</Button>
          <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">RENT</Button>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-lg flex flex-col md:flex-row p-2">
          <input 
            type="text" 
            placeholder="Search locations" 
            className="flex-grow p-2 border-0 focus:outline-none"
          />
          <Button className="bg-primary text-white md:w-auto w-full mt-2 md:mt-0">
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
