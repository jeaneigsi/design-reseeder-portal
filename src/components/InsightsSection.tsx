import { Clock, ArrowRight, MessageCircle } from 'lucide-react';

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  comments: number;
}

const BlogCard = ({ image, date, title, excerpt, comments }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <Clock className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <div className="flex justify-between items-center">
          <button className="text-primary text-sm flex items-center">
            Read More <ArrowRight className="h-4 w-4 ml-1" />
          </button>
          <div className="flex items-center text-gray-500 text-xs">
            <MessageCircle className="h-3 w-3 mr-1" />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightsSection = () => {
  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "15 Mars 2023",
      title: "Comment Préparer Votre Maison pour une Vente Rapide",
      excerpt: "Découvrez les meilleures pratiques pour mettre en valeur votre maison et attirer les acheteurs au meilleur prix.",
      comments: 24
    },
    {
      image: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "10 Mars 2023",
      title: "Conseils pour les Premiers Acheteurs",
      excerpt: "Tout ce que vous devez savoir avant d'acheter votre première maison dans le marché actuel.",
      comments: 18
    },
    {
      image: "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "5 Mars 2023",
      title: "Investissement Immobilier : Les Points Essentiels",
      excerpt: "Les facteurs clés à considérer lors de l'achat d'un bien immobilier à des fins d'investissement.",
      comments: 32
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">A lire</h2>
          <p className="text-gray-500 text-sm md:text-base">Dernières actu du marché</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
