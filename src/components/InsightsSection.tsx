
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
      image: "/placeholder.svg",
      date: "March 15, 2023",
      title: "How to Stage Your Home to Sell Fast",
      excerpt: "Learn the best practices for staging your home to attract buyers and get top dollar.",
      comments: 24
    },
    {
      image: "/placeholder.svg",
      date: "March 10, 2023",
      title: "Tips for First-Time Home Buyers",
      excerpt: "Everything you need to know before purchasing your first home in today's market.",
      comments: 18
    },
    {
      image: "/placeholder.svg",
      date: "March 5, 2023",
      title: "Investment Property: What to Look For",
      excerpt: "Key factors to consider when purchasing a property for investment purposes.",
      comments: 32
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Insight & Opinion</h2>
          <p className="text-gray-500 text-sm md:text-base">Latest news and tips from the real estate market</p>
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
