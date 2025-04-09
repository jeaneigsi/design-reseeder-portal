import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
const PropertyNavbar = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [sticky, setSticky] = useState(false);
  const menuItems = [{
    id: 'overview',
    label: 'Overview'
  }, {
    id: 'property-details',
    label: 'Property details'
  }, {
    id: 'amenities',
    label: 'Amenities'
  }, {
    id: 'location',
    label: 'Location'
  }, {
    id: 'floor-plans',
    label: 'Floor Plans'
  }, {
    id: 'reviews',
    label: 'Reviews'
  }, {
    id: 'similar',
    label: 'Similar properties'
  }];

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
  return <div className={cn("bg-white border-b w-full z-10 transition-all duration-300", sticky ? "sticky top-0 shadow-md" : "")}>
      
    </div>;
};
export default PropertyNavbar;