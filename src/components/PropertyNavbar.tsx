
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";

const PropertyNavbar = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sticky, setSticky] = useState(false);
  
  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'property-details', label: 'Property details' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
    { id: 'floor-plans', label: 'Floor Plans' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'similar', label: 'Similar properties' }
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
          section.scrollIntoView({ behavior: 'smooth' });
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
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={cn(
      "bg-white border-b w-full z-10 transition-all duration-300",
      sticky ? "sticky top-0 shadow-md" : ""
    )}>
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto py-1">
          <NavigationMenuList className="flex space-x-6 overflow-x-auto pb-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <button 
                  onClick={() => handleMenuClick(item.id)}
                  className={cn(
                    "px-2 py-1.5 text-sm font-medium transition-colors hover:text-primary relative",
                    activeMenu === item.id 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                      : "text-gray-600"
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
  );
};

export default PropertyNavbar;
