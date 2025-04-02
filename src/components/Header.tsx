
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-white text-xl">ENTITY</span>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-white hover:text-primary">Home</a></li>
              <li><a href="#" className="text-white hover:text-primary">Buy</a></li>
              <li><a href="#" className="text-white hover:text-primary">Rent</a></li>
              <li><a href="#" className="text-white hover:text-primary">Sell</a></li>
              <li><a href="#" className="text-white hover:text-primary">About</a></li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Sign in</Button>
            <Button className="bg-primary text-white hover:bg-primary/90">ENQUIRE</Button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 p-4">
            <ul className="space-y-4">
              <li><a href="#" className="text-white block hover:text-primary">Home</a></li>
              <li><a href="#" className="text-white block hover:text-primary">Buy</a></li>
              <li><a href="#" className="text-white block hover:text-primary">Rent</a></li>
              <li><a href="#" className="text-white block hover:text-primary">Sell</a></li>
              <li><a href="#" className="text-white block hover:text-primary">About</a></li>
            </ul>
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black">Sign in</Button>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">ENQUIRE</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
