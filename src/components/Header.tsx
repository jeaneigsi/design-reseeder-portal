import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, LogOut, User } from 'lucide-react';
import AddPropertyForm from './AddPropertyForm';
import { useAuth } from '@/lib/AuthContext';
import LoginModal from './LoginModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLoginClick = () => {
    if (user) {
      // Si l'utilisateur est déjà connecté, ne rien faire
      return;
    }
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } else {
      // Rediriger vers la page d'accueil après déconnexion
      navigate('/');
    }
  };

  const handleAddProperty = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      setIsAddPropertyOpen(true);
    }
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="text-black border-black hover:bg-gray-50"
                onClick={handleLoginClick}
              >
                Se connecter
              </Button>
            )}
            
            <Button 
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleAddProperty}
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
              
              {user ? (
                <Button 
                  variant="outline" 
                  className="w-full text-red-500 border-red-500 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Se déconnecter
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full text-black border-black hover:bg-gray-50"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  Se connecter
                </Button>
              )}
              
              <Button 
                className="w-full bg-primary text-white hover:bg-primary/90"
                onClick={() => {
                  setIsMenuOpen(false);
                  if (user) {
                    setIsAddPropertyOpen(true);
                  } else {
                    setIsLoginModalOpen(true);
                  }
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
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        redirectPath={location.pathname}
      />
    </header>
  );
};

export default Header;
