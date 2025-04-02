
import { Button } from "@/components/ui/button";

interface TestimonialProps {
  content: string;
  author: string;
  image: string;
}

const TestimonialCard = ({ content, author, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <p className="text-gray-600 mb-4">"{content}"</p>
      <div className="mt-auto flex items-center">
        <img src={image} alt={author} className="w-10 h-10 rounded-full mr-3" />
        <span className="font-medium">{author}</span>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Working with this real estate company was a wonderful experience. They helped me find my dream home at a great price.",
      author: "Sarah Johnson",
      image: "/placeholder.svg"
    },
    {
      content: "The agents were professional and dedicated. They made selling my property a smooth and stress-free process.",
      author: "Michael Brown",
      image: "/placeholder.svg"
    },
    {
      content: "I was impressed by their market knowledge and negotiation skills. They got me a better deal than I expected.",
      author: "Emily Davis",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Clients Testimonials</h2>
          <p className="text-gray-500 text-sm md:text-base">Hear what our clients have to say about us</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">1</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">2</Button>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">3</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
