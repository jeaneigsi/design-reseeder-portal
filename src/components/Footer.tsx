
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darkblue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-4">ENTITY</h3>
            <p className="text-gray-400 text-sm mb-4">
              We provide the best service in real estate with 25+ years of experience.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Popular Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Services</a></li>
              <li><a href="#" className="hover:text-white">Properties</a></li>
              <li><a href="#" className="hover:text-white">Agents</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Buy a Home</a></li>
              <li><a href="#" className="hover:text-white">Sell a Home</a></li>
              <li><a href="#" className="hover:text-white">Rent a Home</a></li>
              <li><a href="#" className="hover:text-white">Calculate Mortgage</a></li>
              <li><a href="#" className="hover:text-white">Neighborhood Guide</a></li>
              <li><a href="#" className="hover:text-white">Property Trends</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span>123 Business Ave, Downtown, NY 10001</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span>contact@entity.com</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
            <Button className="mt-4 bg-primary">Get Direction</Button>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; 2023 Entity. All rights reserved.
          </p>
          <div className="flex space-x-4 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
