
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  SquareIcon, 
  Heart,
  Share2, 
  PenSquare,
  Phone,
  MessageSquare,
  Star,
  Clock,
  User,
  Shield,
  CheckCircle
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyNavbar from "@/components/PropertyNavbar";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { parcelsData, Parcel, formatPrice } from "@/data/parcelsData";

const PropertyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [property, setProperty] = useState<Parcel | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Parcel[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundProperty = parcelsData.find(p => p.id === parseInt(id));
      setProperty(foundProperty || null);
      
      // Get similar properties (exclude current property)
      if (foundProperty) {
        const similar = parcelsData
          .filter(p => p.id !== foundProperty.id)
          .slice(0, 3);
        setSimilarProperties(similar);
      }
    }
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!property) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-500">Propriété non trouvée</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex-1">
        <BreadcrumbNav />
        <PropertyNavbar />
        
        <div className="container mx-auto px-4 py-8">
          {/* Property Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.subject}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 border-gray-300"
                onClick={toggleFavorite}
              >
                <Heart className={`h-4 w-4 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                <span>{isFavorite ? 'Enregistré' : 'Enregistrer'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 border-gray-300"
              >
                <Share2 className="h-4 w-4 mr-1" />
                <span>Partager</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300"
              >
                <PenSquare className="h-4 w-4 mr-1" />
                <span>Signaler</span>
              </Button>
            </div>
          </div>
          
          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Image Carousel */}
              <div className="bg-white rounded-lg overflow-hidden shadow">
                <div className="p-4">
                  <Carousel className="relative">
                    <CarouselContent>
                      {property.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <img 
                            src={image} 
                            alt={`Image de parcelle ${index + 1}`} 
                            className="w-full h-[400px] object-cover rounded"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                  </Carousel>
                  
                  <div className="flex overflow-x-auto gap-2 mt-4 pb-2">
                    {property.images.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Miniature ${index + 1}`} 
                        className="w-24 h-16 object-cover rounded cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="property-details">
                <h2 className="text-xl font-bold mb-4">Détails de la parcelle</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <SquareIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Surface</span>
                    <span className="text-lg font-bold">{property.area} {property.areaUnit}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <MapPin className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Localisation</span>
                    <span className="text-lg font-bold truncate">{property.location.split(',')[0]}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <User className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Vendeur</span>
                    <span className="text-lg font-bold">{property.seller.type === "STORE" ? "Professionnel" : "Particulier"}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <Clock className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Date</span>
                    <span className="text-lg font-bold">{new Date(property.createdAt || "").toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{property.description}</p>
                <div>
                  <h3 className="text-lg font-bold mb-3">Caractéristiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features?.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="location">
                <h2 className="text-xl font-bold mb-4">Localisation</h2>
                <div className="h-64 bg-gray-200 rounded-lg mb-4">
                  <iframe 
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.656308300895!2d-7.636824324619321!3d33.57231724622553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2f3d6e5a5cb%3A0x498e2300c2ea14fc!2sCasablanca%20Morocco!5e0!3m2!1sen!2sus!4v1712713868121!5m2!1sen!2sus`}
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Similar Properties */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="similar">
                <h2 className="text-xl font-bold mb-4">Parcelles similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarProperties.map((similarProperty) => (
                    <div key={similarProperty.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={similarProperty.images[0]} 
                        alt={similarProperty.subject} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold mb-1 truncate">{similarProperty.subject}</h3>
                        <div className="text-sm text-gray-500 mb-2 truncate">{similarProperty.location}</div>
                        <div className="text-primary font-bold mb-2">{formatPrice(similarProperty.price)}</div>
                        <div className="flex text-xs text-gray-600 justify-between">
                          <span>{similarProperty.area} {similarProperty.areaUnit}</span>
                          <span>{similarProperty.seller.type === "STORE" ? "Professionnel" : "Particulier"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="overflow-hidden shadow">
                <CardContent className="p-0">
                  <div className="bg-primary text-white text-center p-4">
                    <span className="text-2xl font-bold block">{formatPrice(property.price)}</span>
                    <span className="text-sm opacity-90">Prix total</span>
                  </div>
                  <div className="p-4">
                    <Button className="w-full bg-primary mb-3">Planifier une visite</Button>
                    <Button variant="outline" className="w-full border-primary text-primary">Demander des infos</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Agent Card */}
              <Card className="overflow-hidden shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Contact {property.seller.type === "STORE" ? "Agent" : "Vendeur"}</h3>
                  <div className="flex items-center mb-4">
                    <img 
                      src={property.seller.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a"} 
                      alt={property.seller.name} 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold">{property.seller.name}</div>
                      <div className="flex items-center text-sm">
                        {property.seller.isVerifiedSeller && (
                          <div className="flex items-center text-primary mr-2">
                            <Shield className="h-3 w-3 mr-1" /> 
                            <span>Vérifié</span>
                          </div>
                        )}
                        {property.seller.rating && (
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                            <span>{property.seller.rating} ({property.seller.reviews} avis)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full flex items-center justify-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Appeler
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Safety Tips */}
              <Card className="overflow-hidden shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Conseils de sécurité</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Visitez toujours la propriété avant toute transaction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Vérifiez tous les documents légaux avant l'achat</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span>Ne payez jamais en espèces sans reçu officiel</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Ad Cards */}
              <Card className="overflow-hidden shadow bg-gray-800 text-white">
                <CardContent className="p-4">
                  <div className="h-32 flex flex-col justify-between">
                    <h3 className="font-semibold">Trouvez votre terrain idéal aujourd'hui</h3>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4">En savoir plus</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow bg-gray-800 text-white">
                <CardContent className="p-4">
                  <div className="h-32 flex flex-col justify-between">
                    <h3 className="font-semibold">Vous souhaitez vendre votre parcelle?</h3>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4">Contactez-nous</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
