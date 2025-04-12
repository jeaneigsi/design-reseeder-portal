import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from 'lucide-react';
import AddPropertyForm from './AddPropertyForm';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-darkblue text-xl">IMMO-MA</Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-black'} hover:text-primary transition-colors`}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/property" className={`${isActive('/property') ? 'text-primary' : 'text-black'} hover:text-primary transition-colors`}>
                  Propriétés
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${isActive('/contact') ? 'text-primary' : 'text-black'} hover:text-primary transition-colors`}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-black">
              <Phone className="h-4 w-4 mr-2" />
              <span>(+212) 522-123456</span>
            </div>
            <Button variant="outline" className="text-black border-black hover:bg-gray-50">Se connecter</Button>
            <Button 
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => setIsAddPropertyOpen(true)}
            >
              Ajouter une propriété
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white p-4">
            <ul className="space-y-4">
              <li>
                <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-black'} block hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/property" className={`${isActive('/property') ? 'text-primary' : 'text-black'} block hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                  Propriétés
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`${isActive('/contact') ? 'text-primary' : 'text-black'} block hover:text-primary transition-colors`} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-black mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>(+212) 522-123456</span>
              </div>
              <Button variant="outline" className="w-full text-black border-black hover:bg-gray-50">Se connecter</Button>
              <Button 
                className="w-full bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAddPropertyOpen(true);
                }}
              >
                Ajouter une propriété
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <AddPropertyForm 
        isOpen={isAddPropertyOpen} 
        onClose={() => setIsAddPropertyOpen(false)} 
      />
    </header>
  );
};

export default Header;
