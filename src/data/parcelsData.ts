
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
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3"
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
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151"
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
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff"
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
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
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
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
      "https://images.unsplash.com/photo-1469041797191-50ace28483c3",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
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
    forSale: true,
    createdAt: "2024-02-15",
    features: ["Proximité plage", "Quartier résidentiel", "Tous commerces", "Écoles à proximité"]
  }
];

// Helper function to format price
export const formatPrice = (price: Price): string => {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: price.currency,
    maximumFractionDigits: 0,
    currencyDisplay: 'code'
  }).format(price.value)
  .replace('MAD', price.currency);
};
