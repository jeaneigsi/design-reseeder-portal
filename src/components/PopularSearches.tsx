import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, ArrowRight, SquareIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { parcelsData, formatPrice } from "@/data/parcelsData";

// Structure pour les statistiques de popularité
interface ParcelStats {
  id: number;
  views: number;
  favorites: number;
  totalScore: number;
}

const PopularSearches = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [popularParcels, setPopularParcels] = useState(parcelsData.slice(0, 4));
  
  // Simuler des statistiques de popularité pour les parcelles
  useEffect(() => {
    // Générer des statistiques fictives basées sur les vues et les favoris
    const stats: ParcelStats[] = parcelsData.map(parcel => {
      // Générer un nombre aléatoire de vues entre 50 et 500
      const views = Math.floor(Math.random() * 450) + 50;
      // Générer un nombre aléatoire de favoris entre 5 et 50
      const favorites = Math.floor(Math.random() * 45) + 5;
      // Le score total est la somme des vues et des favoris (avec un poids plus important pour les favoris)
      const totalScore = views + (favorites * 10);
      
      return {
        id: parcel.id,
        views,
        favorites,
        totalScore
      };
    });
    
    // Trier les parcelles par score total décroissant
    const sortedStats = stats.sort((a, b) => b.totalScore - a.totalScore);
    
    // Récupérer les parcelles correspondant aux statistiques triées
    const sortedParcels = sortedStats
      .map(stat => parcelsData.find(p => p.id === stat.id))
      .filter(p => p !== undefined)
      .slice(0, 4);
    
    setPopularParcels(sortedParcels as typeof parcelsData);
  }, []);
  
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Parcelles Populaires</h2>
            <p className="text-gray-500 text-sm">Sélection de parcelles par notre équipe</p>
          </div>
          <div className="hidden md:block">
            <Link to="/property">
              <Button variant="outline" className="mr-2">Toutes les parcelles <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Button 
              className="bg-primary"
              onClick={() => document.dispatchEvent(new CustomEvent('open-add-property'))}
            >
              Ajouter une parcelle
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularParcels.map((parcel) => (
            <Link key={parcel.id} to={`/property/${parcel.id}`} className="block rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img src={parcel.images[0]} alt={parcel.subject} className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {parcel.featured && (
                    <Badge className="bg-primary text-white">Vedette</Badge>
                  )}
                  {parcel.forSale && (
                    <Badge className="bg-blue-500 text-white">À Vendre</Badge>
                  )}
                </div>
                <button 
                  className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center"
                  onClick={(e) => toggleFavorite(parcel.id, e)}
                >
                  <Heart className={`h-4 w-4 ${favorites.includes(parcel.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{formatPrice(parcel.price)}</h3>
                <h4 className="font-semibold mb-2 hover:text-primary transition-colors">{parcel.subject}</h4>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{parcel.location}</span>
                </div>
                <div className="flex border-t pt-4">
                  <div className="flex items-center mr-4">
                    <SquareIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{parcel.area} {parcel.areaUnit}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">{parcel.seller.type === "STORE" ? "Professionnel" : "Particulier"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">2</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">3</Button>
          </div>
        </div>
        
        <div className="md:hidden mt-6 flex flex-col space-y-2">
          <Link to="/property">
            <Button variant="outline" className="w-full">Toutes les parcelles <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
          <Button 
            className="w-full bg-primary"
            onClick={() => document.dispatchEvent(new CustomEvent('open-add-property'))}
          >
            Ajouter une parcelle
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
