import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationContext } from "@/App";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import RealEstateAgentCTA from "@/components/RealEstateAgentCTA";
import PropertyCard from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  SquareIcon, 
  VerifiedIcon, 
  Star, 
  MessageSquare,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { parcelsData, formatPrice } from "@/data/parcelsData";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(parcelsData[0]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [similarProperties, setSimilarProperties] = useState([]);

  // Contexte de navigation pour conserver l'état
  const { previousPath } = useContext(NavigationContext);

  useEffect(() => {
    if (id) {
      const propertyId = parseInt(id);
      const foundProperty = parcelsData.find(p => p.id === propertyId);
      
      if (foundProperty) {
        setProperty(foundProperty);
        setLoading(false);
        
        // Trouver des propriétés similaires (même ville ou même type)
        const location = foundProperty.location.split(",")[0].trim().toLowerCase();
        const type = foundProperty.subject.split("-")[0].trim().toLowerCase();
        
        const similar = parcelsData
          .filter(p => p.id !== propertyId)
          .filter(p => 
            p.location.toLowerCase().includes(location) || 
            p.subject.toLowerCase().includes(type)
          )
          .slice(0, 3);
        
        setSimilarProperties(similar);
      } else {
        navigate("/not-found");
      }
    }
  }, [id, navigate]);

  // Fonction pour revenir à la liste précédente
  const handleBackToList = () => {
    if (previousPath.includes("/property") || 
        previousPath.includes("/achat") || 
        previousPath.includes("/location")) {
      navigate(previousPath);
    } else {
      navigate("/property");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BreadcrumbNav />
      
      {/* Main Content */}
      <motion.main 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Bouton Retour avec l'historique conservé */}
        <button 
          onClick={handleBackToList}
          className="flex items-center text-primary hover:text-primary-dark transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Retour à la liste</span>
        </button>

        {/* En-tête de propriété */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.subject}</h1>
            <div className="flex items-center text-gray-500 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-primary font-bold text-2xl">{formatPrice(property.price)}</div>
            <div className="text-sm text-gray-500 mb-3">
              {property.forSale ? "À Vendre" : "À Louer"}
            </div>
          </div>
        </div>
        
        {/* Galerie d'images avec animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative h-[400px] rounded-lg overflow-hidden"
              >
                <img 
                  src={property.images[activeImage]} 
                  alt={property.subject} 
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {activeImage + 1}/{property.images.length}
                </div>
                
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  onClick={() => setActiveImage(prev => (prev === 0 ? property.images.length - 1 : prev - 1))}
                >
                  <ArrowLeft size={20} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  onClick={() => setActiveImage(prev => (prev === property.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="hidden md:grid grid-cols-2 gap-4 h-[400px] overflow-y-auto">
            {property.images.map((image, index) => (
              <div 
                key={index} 
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeImage === index ? 'ring-2 ring-primary' : 'hover:opacity-80'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${property.subject} - image ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Détails de la propriété */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm mb-6"
            >
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 mb-6">
                {property.description}
              </p>
              
              <h3 className="font-semibold text-lg mb-3">Informations</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <SquareIcon className="h-5 w-5 mr-2 text-primary" />
                  <span>Surface: {property.area} {property.areaUnit}</span>
                </div>
                {property.createdAt && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>Ajouté le: {property.createdAt}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 bg-primary rounded-full"></div>
                  </div>
                  <span>Type: {property.subject.split('-')[0].trim()}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center">
                    <div className="h-2.5 w-2.5 bg-primary rounded-full"></div>
                  </div>
                  <span>Statut: {property.forSale ? "À Vendre" : "À Louer"}</span>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg mb-3">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.features?.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4">Localisation</h2>
              <div className="aspect-video bg-gray-200 rounded mb-6">
                <iframe 
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-sm mb-6"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={property.seller.image || "https://via.placeholder.com/100"} 
                  alt={property.seller.name} 
                  className="h-16 w-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{property.seller.name}</h3>
                  <p className="text-sm text-gray-500">
                    {property.seller.type === "STORE" ? "Professionnel" : "Particulier"}
                    {property.seller.isVerifiedSeller && " • Vérifié"}
                  </p>
                  {property.seller.rating && (
                    <div className="flex items-center text-sm">
                      <span className="text-amber-500">★</span>
                      <span className="ml-1">{property.seller.rating}/5</span>
                      <span className="text-gray-500 ml-1">
                        ({property.seller.reviews} avis)
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                {property.seller.phone && (
                  <div className="flex items-center mb-2">
                    <span className="text-gray-500 mr-2">Tél:</span>
                    <span>{property.seller.phone}</span>
                  </div>
                )}
                {property.seller.email && (
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">Email:</span>
                    <span>{property.seller.email}</span>
                  </div>
                )}
              </div>
              
              <Button className="w-full">Contacter le vendeur</Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-3 relative overflow-hidden group border border-gray-200"
                onClick={() => {
                  window.alert(`Demande d'étude de faisabilité pour la parcelle: ${property.subject}`);
                }}
              >
                <span className="relative z-10 text-gray-700 group-hover:text-white transition-colors duration-500">✨ Étude de faisabilité</span>
                <span className="absolute inset-0 w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out z-0"></span>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  Ajouter aux favoris
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M7 11v2a3 3 0 0 0 3 3h9l3.36 3.34a1 1 0 0 0 1.41 0l.01-.01a1 1 0 0 0 0-1.42L20.16 14H11a1 1 0 0 1-1-1v-2H7Z"></path><path d="M15 13v2l3.36 3.36a1 1 0 0 0 1.41 0l-.01-.01a1 1 0 0 0 0-1.41L16.16 14H11a1 1 0 0 1-1-1v-2"></path><circle cx="5" cy="13" r="3"></circle><circle cx="13" cy="5" r="3"></circle></svg>
                  Partager cette annonce
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M8.5 16.5a5 5 0 0 1 7 0"></path><path d="M2 8.82a15 15 0 0 1 4.17-2.65"></path><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"></path><path d="M16.85 11.25c1.25.54 2.13 1.67 2.36 3.07"></path><path d="M5 13a8 8 0 0 0 4 2.5"></path></svg>
                  Signaler cette annonce
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Propriétés similaires */}
        {similarProperties.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6">Propriétés similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </motion.div>
        )}
      </motion.main>
      
      <RealEstateAgentCTA />
      <Footer />
    </div>
  );
};

export default PropertyDetail;
