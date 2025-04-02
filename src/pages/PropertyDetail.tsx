
import { useState } from "react";
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
  Bed, 
  Bath, 
  SquareIcon, 
  Heart,
  Share2, 
  PenSquare,
  Phone,
  MessageSquare,
  Star
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyNavbar from "@/components/PropertyNavbar";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PropertyCard from "@/components/PropertyCard";

const PropertyDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Mock property data - in a real app, this would come from an API
  const property = {
    id: parseInt(id || "1"),
    title: "Elegant studio flat",
    address: "102 Ingraham St, Brooklyn, NY 11237",
    price: 250.00,
    beds: 3,
    baths: 3,
    sqft: 4243,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit.",
    features: [
      "Air conditioning", "Balcony", "Fireplace", "Garden", "Heating", "Parking"
    ],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    ],
    floorPlans: [
      {
        id: 1,
        name: "First Floor",
        image: "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904"
      },
      {
        id: 2,
        name: "Second Floor",
        image: "https://images.unsplash.com/photo-1621293954908-907159247fc8"
      }
    ],
    agent: {
      name: "George William",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      rating: 4.8,
      reviews: 42,
      phone: "(123) 456-7890",
      email: "george.william@example.com"
    },
    reviews: [
      {
        id: 1,
        user: {
          name: "John Smith",
          image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"
        },
        rating: 5,
        date: "3 weeks ago",
        text: "Great property! The location is perfect and the amenities are excellent."
      },
      {
        id: 2,
        user: {
          name: "Jane Doe",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        },
        rating: 4,
        date: "1 month ago",
        text: "The property was clean and well-maintained. The only issue was parking."
      }
    ],
    similarProperties: [
      {
        id: 101,
        title: "Cozy apartment",
        address: "204 Bedford Ave, Brooklyn, NY 11249",
        price: 185.00,
        beds: 2,
        baths: 1,
        sqft: 985,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
        featured: true,
        forSale: true
      },
      {
        id: 102,
        title: "Modern loft",
        address: "120 Havemeyer St, Brooklyn, NY 11211",
        price: 320.00,
        beds: 3,
        baths: 2,
        sqft: 1200,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        featured: false,
        forSale: true
      },
      {
        id: 103,
        title: "Downtown studio",
        address: "88 Wythe Ave, Brooklyn, NY 11211",
        price: 175.00,
        beds: 1,
        baths: 1,
        sqft: 650,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        featured: false,
        forSale: true
      }
    ]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

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
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.address}</span>
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
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 border-gray-300"
              >
                <Share2 className="h-4 w-4 mr-1" />
                <span>Share</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300"
              >
                <PenSquare className="h-4 w-4 mr-1" />
                <span>Report</span>
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
                            alt={`Property image ${index + 1}`} 
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
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-24 h-16 object-cover rounded cursor-pointer"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="property-details">
                <h2 className="text-xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <Bed className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Bedrooms</span>
                    <span className="text-lg font-bold">{property.beds}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <Bath className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Bathrooms</span>
                    <span className="text-lg font-bold">{property.baths}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <SquareIcon className="h-6 w-6 text-primary mb-2" />
                    <span className="text-sm text-gray-500">Square Ft</span>
                    <span className="text-lg font-bold">{property.sqft}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="text-lg font-bold">${property.price}.00/month</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{property.description}</p>
                <div>
                  <h3 className="text-lg font-bold mb-3">Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
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
                <h2 className="text-xl font-bold mb-4">Location</h2>
                <div className="h-64 bg-gray-200 rounded-lg mb-4">
                  <iframe 
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2sBrooklyn%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1625090389732!5m2!1sen!2sus"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span>{property.address}</span>
                </div>
              </div>

              {/* Floor Plans */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="floor-plans">
                <h2 className="text-xl font-bold mb-4">Floor Plans</h2>
                {property.floorPlans.map((plan) => (
                  <div key={plan.id} className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">{plan.name}</h3>
                    <img 
                      src={plan.image} 
                      alt={`${plan.name} plan`} 
                      className="w-full h-auto rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>

              {/* Reviews Section */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="reviews">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Client Reviews</h2>
                  <Button className="bg-primary">Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {property.reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-center mb-3">
                        <img 
                          src={review.user.image} 
                          alt={review.user.name} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-semibold">{review.user.name}</div>
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Properties */}
              <div className="bg-white rounded-lg overflow-hidden shadow p-6" id="similar">
                <h2 className="text-xl font-bold mb-4">Similar Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {property.similarProperties.map((similarProperty) => (
                    <div key={similarProperty.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={similarProperty.image} 
                        alt={similarProperty.title} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold mb-1">{similarProperty.title}</h3>
                        <div className="text-sm text-gray-500 mb-2">{similarProperty.address}</div>
                        <div className="text-primary font-bold mb-2">${similarProperty.price}.00/month</div>
                        <div className="flex text-xs text-gray-600 justify-between">
                          <span>{similarProperty.beds} Beds</span>
                          <span>{similarProperty.baths} Baths</span>
                          <span>{similarProperty.sqft} Sqft</span>
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
                    <span className="text-2xl font-bold block">${property.price}.00</span>
                    <span className="text-sm opacity-90">Per month</span>
                  </div>
                  <div className="p-4">
                    <Button className="w-full bg-primary mb-3">Schedule a visit</Button>
                    <Button variant="outline" className="w-full border-primary text-primary">Request info</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Agent Card */}
              <Card className="overflow-hidden shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Contact Agent</h3>
                  <div className="flex items-center mb-4">
                    <img 
                      src={property.agent.image} 
                      alt={property.agent.name} 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <div className="font-semibold">{property.agent.name}</div>
                      <div className="flex items-center text-sm">
                        <div className="flex mr-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                        </div>
                        <span>{property.agent.rating} ({property.agent.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button className="w-full flex items-center justify-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Ad Cards */}
              <Card className="overflow-hidden shadow bg-gray-800 text-white">
                <CardContent className="p-4">
                  <div className="h-32 flex flex-col justify-between">
                    <h3 className="font-semibold">Find your dream home today</h3>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4">Learn more</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden shadow bg-gray-800 text-white">
                <CardContent className="p-4">
                  <div className="h-32 flex flex-col justify-between">
                    <h3 className="font-semibold">Looking to sell your property?</h3>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full mt-4">Contact us</Button>
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
