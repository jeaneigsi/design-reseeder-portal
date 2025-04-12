import React, { createContext, useState, useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  BrowserRouter,
  Routes,
  useLocation
} from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Property from "./pages/Property";
import PropertyDetail from "./pages/PropertyDetail";
import Achat from "./pages/Achat";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Contexte pour gérer l'état de navigation et les filtres
interface NavigationContextType {
  scrollPositions: Record<string, number>;
  setScrollPosition: (key: string, position: number) => void;
  activeFilters: Record<string, any>;
  setActiveFilters: (key: string, filters: any) => void;
  previousPath: string;
  setPreviousPath: (path: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  scrollPositions: {},
  setScrollPosition: () => {},
  activeFilters: {},
  setActiveFilters: () => {},
  previousPath: "/",
  setPreviousPath: () => {},
});

// Composant qui gère le défilement vers le haut lors des changements de route
const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const { scrollPositions, setScrollPosition, setPreviousPath } = React.useContext(NavigationContext);
  
  useEffect(() => {
    // Sauvegarde la position actuelle avant de naviguer
    setScrollPosition(window.location.pathname + window.location.search, window.scrollY);
    setPreviousPath(window.location.pathname + window.location.search);
    
    // Effectue un défilement vers le haut sauf si on revient à une page précédente
    const savedPosition = scrollPositions[pathname + search];
    if (savedPosition) {
      // Utilise requestAnimationFrame pour s'assurer que le DOM est prêt
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, search]);

  return null;
};

const queryClient = new QueryClient();

// Composant App avec le contexte de navigation
const App = () => {
  // État pour le contexte de navigation
  const [scrollPositions, setScrollPositionsState] = useState<Record<string, number>>({});
  const [activeFilters, setActiveFiltersState] = useState<Record<string, any>>({});
  const [previousPath, setPreviousPathState] = useState("/");

  // Fonctions pour mettre à jour le contexte
  const setScrollPosition = (key: string, position: number) => {
    setScrollPositionsState(prev => ({ ...prev, [key]: position }));
  };

  const setActiveFilters = (key: string, filters: any) => {
    setActiveFiltersState(prev => ({ ...prev, [key]: filters }));
  };

  const setPreviousPath = (path: string) => {
    setPreviousPathState(path);
  };

  // Valeurs du contexte
  const navigationContext: NavigationContextType = {
    scrollPositions,
    setScrollPosition,
    activeFilters,
    setActiveFilters,
    previousPath,
    setPreviousPath
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <NavigationContext.Provider value={navigationContext}>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/property" element={<Property />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/achat" element={<Achat />} />
              <Route path="/location" element={<Location />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NavigationContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
