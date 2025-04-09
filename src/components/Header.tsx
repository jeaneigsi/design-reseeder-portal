
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from 'lucide-react';

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
            <Link to="/" className="font-bold text-white text-xl">DARNA</Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-primary">Accueil</Link></li>
              <li><Link to="/achat" className="text-white hover:text-primary">Achat</Link></li>
              <li><Link to="/location" className="text-white hover:text-primary">Location</Link></li>
              <li><Link to="/property" className="text-white hover:text-primary">Propriétés</Link></li>
              <li><Link to="/contact" className="text-white hover:text-primary">Contact</Link></li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-white">
              <Phone className="h-4 w-4 mr-2" />
              <span>(+212) 522-123456</span>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Se connecter</Button>
            <Button className="bg-primary text-white hover:bg-primary/90">Ajouter une propriété</Button>
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
              <li><Link to="/" className="text-white block hover:text-primary">Accueil</Link></li>
              <li><Link to="/achat" className="text-white block hover:text-primary">Achat</Link></li>
              <li><Link to="/location" className="text-white block hover:text-primary">Location</Link></li>
              <li><Link to="/property" className="text-white block hover:text-primary">Propriétés</Link></li>
              <li><Link to="/contact" className="text-white block hover:text-primary">Contact</Link></li>
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-white mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>(+212) 522-123456</span>
              </div>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black">Se connecter</Button>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">Ajouter une propriété</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
