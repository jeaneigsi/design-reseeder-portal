
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-lg p-8 flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:pr-8 mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Are You Selling Or Renting Your Property?</h2>
            <p className="text-white opacity-90 mb-4">
              Let us help you with professional services and the best agent network
            </p>
            <div className="space-x-4">
              <Button variant="secondary">Get In Touch</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">Learn More</Button>
            </div>
          </div>
          <div className="md:w-1/3">
            <img src="/placeholder.svg" alt="Real estate agent" className="w-full h-auto max-w-xs mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
