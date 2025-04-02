
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BreadcrumbNav = () => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400" />
                <span className="ml-1 md:ml-2 text-gray-600">Property Listing</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbNav;
