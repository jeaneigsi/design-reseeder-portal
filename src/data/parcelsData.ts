// Mock data for property parcels
export interface Seller {
  type: "STORE" | "INDIVIDUAL";
  name: string;
  isVerifiedSeller: boolean;
  image?: string;
  rating?: number;
  reviews?: number;
  phone?: string;
  email?: string;
}

export interface Price {
  value: number;
  currency: string;
}

export interface Parcel {
  id: number;
  subject: string;
  location: string;
  price: Price;
  images: string[];
  seller: Seller;
  description?: string;
  area?: number;
  areaUnit?: string;
  featured?: boolean;
  forSale?: boolean;
  createdAt?: string;
  features?: string[];
}

// Generate mock data for parcels
export const parcelsData: Parcel[] = [
  {
    id: 1,
    subject: "VENTE LOT DE TERRAIN - 113M²",
    location: "Casablanca, Lissasfa",
    price: {
      value: 898350,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10130169825?t=images",
      "https://content.avito.ma/classifieds/images/10130169733?t=images",
      "https://content.avito.ma/classifieds/images/10130169609?t=images",
      "https://content.avito.ma/classifieds/images/10130169619?t=images",
      "https://content.avito.ma/classifieds/images/10130169635?t=images",
      "https://content.avito.ma/classifieds/images/10130169679?t=images",
      "https://content.avito.ma/classifieds/images/10130169712?t=images"
  ],
    seller: {
      type: "STORE",
      name: "TIJARA DEVELOPPEMENT",
      isVerifiedSeller: false,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      rating: 4.8,
      reviews: 42,
      phone: "(+212) 522-987654",
      email: "contact@tijara.ma"
    },
    description: "Magnifique lot de terrain à vendre dans un quartier prisé de Casablanca. Idéal pour construction résidentielle ou commerciale. Titre foncier clair et sans litiges.",
    area: 113,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2023-10-15",
    features: ["Titre foncier", "Accès facile", "Proximité commerces", "Quartier sécurisé"]
  },
  {
    id: 2,
    subject: "TERRAIN AGRICOLE - 5 HECTARES",
    location: "Marrakech, Route de Fès",
    price: {
      value: 2500000,
      currency: "DH"
    },
    images: [
              "https://content.avito.ma/classifieds/images/10115340275?t=images",
              "https://content.avito.ma/classifieds/images/10115340272?t=images",
              "https://content.avito.ma/classifieds/images/10124184737?t=images",
              "https://content.avito.ma/classifieds/images/10115340271?t=images",
              "https://content.avito.ma/classifieds/images/10115340270?t=images",
              "https://content.avito.ma/classifieds/images/10115340278?t=images",
              "https://content.avito.ma/classifieds/images/10115340279?t=images"
          ],
    seller: {
      type: "INDIVIDUAL",
      name: "Mohamed Alami",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
      rating: 4.5,
      reviews: 28,
      phone: "(+212) 661-123456",
      email: "m.alami@gmail.com"
    },
    description: "Terrain agricole fertile avec source d'eau, idéal pour l'agriculture ou projet touristique. Accès direct depuis la route principale de Fès.",
    area: 50000,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2023-11-05",
    features: ["Source d'eau", "Sol fertile", "Accès routier", "Électricité à proximité"]
  },
  {
    id: 3,
    subject: "TERRAIN CONSTRUCTIBLE - 250M²",
    location: "Tanger, Malabata",
    price: {
      value: 1450000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10110716582?t=images",
      "https://content.avito.ma/classifieds/images/10110716649?t=images",
      "https://content.avito.ma/classifieds/images/10110716629?t=images",
      "https://content.avito.ma/classifieds/images/10110716630?t=images",
      "https://content.avito.ma/classifieds/images/10110716631?t=images"
  ],
    seller: {
      type: "STORE",
      name: "TANGER IMMOBILIER",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      rating: 4.9,
      reviews: 67,
      phone: "(+212) 539-876543",
      email: "contact@tangerimmobilier.ma"
    },
    description: "Superbe terrain dans le quartier prestigieux de Malabata avec vue sur mer. Tous documents administratifs en règle. Idéal pour villa de luxe.",
    area: 250,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2023-12-01",
    features: ["Vue sur mer", "Zone résidentielle", "Quartier sécurisé", "Proximité plage"]
  },
  {
    id: 4,
    subject: "PARCELLE INDUSTRIELLE - 1200M²",
    location: "Rabat, Zone Industrielle",
    price: {
      value: 3800000,
      currency: "DH"
    },
    images: [
              "https://content.avito.ma/classifieds/images/10132544752?t=images",
              "https://content.avito.ma/classifieds/images/10132544751?t=images",
              "https://content.avito.ma/classifieds/images/10132544753?t=images"
          ],
    seller: {
      type: "STORE",
      name: "RABAT PRO IMMOBILIER",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 4.7,
      reviews: 53,
      phone: "(+212) 537-654321",
      email: "info@rabatpro.ma"
    },
    description: "Parcelle industrielle dans la nouvelle zone industrielle de Rabat. Parfaite pour entrepôt ou manufacture. Tous réseaux disponibles.",
    area: 1200,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2024-01-10",
    features: ["Zone industrielle", "Accès poids lourds", "Tous réseaux", "Sécurité 24/7"]
  },
  {
    id: 5,
    subject: "TERRAIN RÉSIDENTIEL - 400M²",
    location: "Agadir, Founty",
    price: {
      value: 1200000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10132925629?t=images",
      "https://content.avito.ma/classifieds/images/10132925631?t=images"
  ],
    seller: {
      type: "INDIVIDUAL",
      name: "Nadia Bensalem",
      isVerifiedSeller: false,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      rating: 4.2,
      reviews: 15,
      phone: "(+212) 668-987654",
      email: "nadiab@gmail.com"
    },
    description: "Beau terrain plat dans le quartier de Founty à Agadir. Proximité plage et commerces. Idéal pour construction villa familiale.",
    area: 400,
    areaUnit: "m²",
    featured: true,
    //forSale: true,
    createdAt: "2024-02-15",
    features: ["Proximité plage", "Quartier résidentiel", "Tous commerces", "Écoles à proximité"]
  },
  {
    id: 6,
    subject: "TERRAIN COMMERCIAL - 800M²",
    location: "Fès, Quartier des Affaires",
    price: {
      value: 2200000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10130169825?t=images",
      "https://content.avito.ma/classifieds/images/10130169733?t=images"
    ],
    seller: {
      type: "STORE",
      name: "FES BUSINESS PROPERTIES",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7",
      rating: 4.6,
      reviews: 38,
      phone: "(+212) 535-789456",
      email: "contact@fesbusiness.ma"
    },
    description: "Terrain commercial idéalement situé au cœur du quartier des affaires de Fès. Excellente visibilité et accès facile. Adapté pour bureaux ou commerce.",
    area: 800,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2024-01-18",
    features: ["Zone commerciale", "Forte visibilité", "Accès facile", "Tous services"]
  },
  {
    id: 7,
    subject: "TERRAIN CONSTRUCTIBLE - 350M²",
    location: "Meknès, Centre-ville",
    price: {
      value: 950000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10110716582?t=images",
      "https://content.avito.ma/classifieds/images/10110716649?t=images"
    ],
    seller: {
      type: "INDIVIDUAL",
      name: "Hassan Tazi",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      rating: 4.3,
      reviews: 21,
      phone: "(+212) 663-456123",
      email: "hassantazi@gmail.com"
    },
    description: "Terrain bien situé au centre de Meknès, proche de toutes commodités. Parfait pour projet résidentiel ou petit immeuble.",
    area: 350,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2023-12-28",
    features: ["Centre-ville", "Proximité commerces", "Quartier calme", "Accès facile"]
  },
  {
    id: 8,
    subject: "PARCELLE VIABILISÉE - 500M²",
    location: "Tétouan, Zone Martil",
    price: {
      value: 1350000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10132925629?t=images",
      "https://content.avito.ma/classifieds/images/10132925631?t=images"
    ],
    seller: {
      type: "STORE",
      name: "NORD IMMOBILIER",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1541577141970-eebc83ebe30e",
      rating: 4.8,
      reviews: 45,
      phone: "(+212) 539-123456",
      email: "info@nordimmobilier.ma"
    },
    description: "Belle parcelle viabilisée proche de la plage de Martil. Terrain plat et sans contraintes particulières. Idéal pour villa de vacances.",
    area: 500,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2024-02-05",
    features: ["Viabilisé", "Proximité plage", "Vue dégagée", "Quartier résidentiel"]
  },
  {
    id: 9,
    subject: "TERRAIN POUR VILLA - 600M²",
    location: "Marrakech, La Palmeraie",
    price: {
      value: 2800000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10115340275?t=images",
      "https://content.avito.ma/classifieds/images/10115340272?t=images"
    ],
    seller: {
      type: "STORE",
      name: "LUXURY MARRAKECH",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      rating: 4.9,
      reviews: 72,
      phone: "(+212) 524-567890",
      email: "contact@luxurymarrakech.ma"
    },
    description: "Magnifique terrain dans le quartier prestigieux de La Palmeraie. Vue imprenable sur l'Atlas et environnement paisible. Parfait pour villa de luxe.",
    area: 600,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2024-01-22",
    features: ["Quartier prestigieux", "Vue sur Atlas", "Calme", "Sécurité 24/7"]
  },
  {
    id: 10,
    subject: "TERRAIN ZONE TOURISTIQUE - 1500M²",
    location: "Essaouira, Bord de mer",
    price: {
      value: 3500000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10132544752?t=images",
      "https://content.avito.ma/classifieds/images/10132544751?t=images"
    ],
    seller: {
      type: "INDIVIDUAL",
      name: "Rachid Benali",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1557862921-37829c790f19",
      rating: 4.7,
      reviews: 31,
      phone: "(+212) 670-891234",
      email: "rachid.benali@gmail.com"
    },
    description: "Terrain exceptionnel en bord de mer à Essaouira. Idéal pour projet touristique, hôtel ou résidence de luxe. Vue imprenable sur l'océan.",
    area: 1500,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2023-11-25",
    features: ["Front de mer", "Vue océan", "Zone touristique", "Projet autorisé"]
  },
  {
    id: 11,
    subject: "TERRAIN RÉSIDENTIEL - 300M²",
    location: "Casablanca, Californie",
    price: {
      value: 1100000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10130169825?t=images",
      "https://content.avito.ma/classifieds/images/10130169733?t=images"
    ],
    seller: {
      type: "STORE",
      name: "CASA PREMIUM",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce",
      rating: 4.5,
      reviews: 58,
      phone: "(+212) 522-345678",
      email: "contact@casapremium.ma"
    },
    description: "Terrain bien situé dans le quartier résidentiel de Californie. Proche des écoles et commodités. Parfait pour construction de villa.",
    area: 300,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2024-02-20",
    features: ["Proximité écoles", "Quartier résidentiel", "Sécurisé", "Commerces à proximité"]
  },
  {
    id: 12,
    subject: "TERRAIN AGRICOLE - 2 HECTARES",
    location: "Agadir, Périphérie",
    price: {
      value: 1700000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10115340275?t=images",
      "https://content.avito.ma/classifieds/images/10115340272?t=images"
    ],
    seller: {
      type: "INDIVIDUAL",
      name: "Fatima Zahra",
      isVerifiedSeller: false,
      image: "https://images.unsplash.com/photo-1659482633369-9dbd93b0830a",
      rating: 4.0,
      reviews: 12,
      phone: "(+212) 668-123789",
      email: "fatima.z@gmail.com"
    },
    description: "Terrain agricole fertile avec puits et système d'irrigation. Actuellement planté d'agrumes. Bon investissement agricole.",
    area: 20000,
    areaUnit: "m²",
    featured: false,
    forSale: true,
    createdAt: "2023-10-30",
    features: ["Irrigué", "Puits", "Plantation existante", "Accès routier"]
  },
  {
    id: 13,
    subject: "TERRAIN CONSTRUCTIBLE - 450M²",
    location: "Rabat, Hay Riad",
    price: {
      value: 2100000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10132925629?t=images",
      "https://content.avito.ma/classifieds/images/10132925631?t=images"
    ],
    seller: {
      type: "STORE",
      name: "RIAD IMMOBILIER",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf",
      rating: 4.8,
      reviews: 64,
      phone: "(+212) 537-987654",
      email: "contact@riadimmo.ma"
    },
    description: "Terrain bien placé dans le quartier huppé de Hay Riad. Environnement calme et sécurisé. Idéal pour villa de standing.",
    area: 450,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2024-01-15",
    features: ["Quartier huppé", "Plans approuvés", "Titre foncier", "Facilement accessible"]
  },
  {
    id: 14,
    subject: "PARCELLE EN LOCATION - 800M²",
    location: "Tanger, Zone Industrielle",
    price: {
      value: 15000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10132544752?t=images",
      "https://content.avito.ma/classifieds/images/10132544751?t=images"
    ],
    seller: {
      type: "STORE",
      name: "TANGER BUSINESS",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
      rating: 4.6,
      reviews: 49,
      phone: "(+212) 539-456123",
      email: "info@tangerbusiness.ma"
    },
    description: "Parcelle industrielle disponible à la location. Idéale pour stockage ou activité industrielle légère. Contrat longue durée possible.",
    area: 800,
    areaUnit: "m²",
    featured: false,
    forSale: false,
    createdAt: "2024-02-10",
    features: ["Zone industrielle", "Clôturé", "Accès camions", "Surveillance"]
  },
  {
    id: 15,
    subject: "TERRAIN VUE MER - 500M²",
    location: "Al Hoceima, Front de mer",
    price: {
      value: 1900000,
      currency: "DH"
    },
    images: [
      "https://content.avito.ma/classifieds/images/10110716582?t=images",
      "https://content.avito.ma/classifieds/images/10110716649?t=images"
    ],
    seller: {
      type: "INDIVIDUAL",
      name: "Karim Amrani",
      isVerifiedSeller: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 4.5,
      reviews: 26,
      phone: "(+212) 661-987321",
      email: "karim.amrani@gmail.com"
    },
    description: "Magnifique terrain avec vue imprenable sur la Méditerranée. Emplacement exceptionnel pour villa de vacances ou résidence principale.",
    area: 500,
    areaUnit: "m²",
    featured: true,
    forSale: true,
    createdAt: "2023-12-15",
    features: ["Vue mer", "Accès direct plage", "Environnement calme", "Titre foncier"]
  }
];

// Helper function to format price
export const formatPrice = (price: Price): string => {
  // "DH" is not a valid ISO currency code, so we use "MAD" (Moroccan Dirham) instead
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0
  }).format(price.value)
  .replace('MAD', price.currency);
};
