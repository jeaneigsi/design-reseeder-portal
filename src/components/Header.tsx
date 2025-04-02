
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
            <Link to="/" className="font-bold text-white text-xl">ENTITY</Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-primary">Home</Link></li>
              <li>
                <div className="relative group">
                  <Link to="/property" className="text-white hover:text-primary flex items-center">
                    Listing
                  </Link>
                </div>
              </li>
              <li><Link to="#" className="text-white hover:text-primary">Pages</Link></li>
              <li><Link to="#" className="text-white hover:text-primary">Blog</Link></li>
              <li><Link to="#" className="text-white hover:text-primary">Contact</Link></li>
            </ul>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-white">
              <Phone className="h-4 w-4 mr-2" />
              <span>(403) 555-0123</span>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Sign in</Button>
            <Button className="bg-primary text-white hover:bg-primary/90">Add property</Button>
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
              <li><Link to="/" className="text-white block hover:text-primary">Home</Link></li>
              <li><Link to="/property" className="text-white block hover:text-primary">Listing</Link></li>
              <li><Link to="#" className="text-white block hover:text-primary">Pages</Link></li>
              <li><Link to="#" className="text-white block hover:text-primary">Blog</Link></li>
              <li><Link to="#" className="text-white block hover:text-primary">Contact</Link></li>
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-white mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>(403) 555-0123</span>
              </div>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-black">Sign in</Button>
              <Button className="w-full bg-primary text-white hover:bg-primary/90">Add property</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
