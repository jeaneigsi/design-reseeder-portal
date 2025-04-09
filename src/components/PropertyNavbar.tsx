
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const PropertyNavbar = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sticky, setSticky] = useState(false);
  
  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'property-details', label: 'Détails de la propriété' },
    { id: 'amenities', label: 'Commodités' },
    { id: 'location', label: 'Emplacement' },
    { id: 'floor-plans', label: 'Plans d\'étage' },
    { id: 'reviews', label: 'Avis' },
    { id: 'similar', label: 'Propriétés similaires' }
  ];

  // Handle scroll to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll to section when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth'
          });
          setActiveMenu(hash);
        }
      }
    };

    // Initial check for hash on load
    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const handleMenuClick = (id: string) => {
    setActiveMenu(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className={cn("bg-white border-b w-full z-10 transition-all duration-300", sticky ? "sticky top-0 shadow-md" : "")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.id} className="px-1">
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={cn(
                      "py-2 px-3 text-sm",
                      activeMenu === item.id
                        ? "text-primary font-semibold"
                        : "text-gray-600 hover:text-primary"
                    )}
                  >
                    {item.label}
                  </button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
};

export default PropertyNavbar;
