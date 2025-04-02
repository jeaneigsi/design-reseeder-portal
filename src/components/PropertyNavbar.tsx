
import { useState } from 'react';
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
  
  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'property-details', label: 'Property details' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'similar', label: 'Similar properties' }
  ];

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto py-1">
          <NavigationMenuList className="flex space-x-6 overflow-x-auto pb-2">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item.id}>
                <Link 
                  to={`#${item.id}`}
                  onClick={() => setActiveMenu(item.id)}
                  className={cn(
                    "px-2 py-1.5 text-sm font-medium transition-colors hover:text-primary relative",
                    activeMenu === item.id 
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary" 
                      : "text-gray-600"
                  )}
                >
                  {item.label}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default PropertyNavbar;
