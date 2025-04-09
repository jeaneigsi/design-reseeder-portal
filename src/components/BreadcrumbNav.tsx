
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { parcelsData } from "@/data/parcelsData";

const BreadcrumbNav = () => {
  const { id } = useParams();
  const parcel = id ? parcelsData.find(p => p.id === parseInt(id)) : null;
  
  return (
    <div className="bg-white border-b py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary">
            Accueil
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <Link to="/property" className="text-gray-500 hover:text-primary">
            Parcelles
          </Link>
          {parcel && (
            <>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-gray-800 font-medium truncate">{parcel.subject}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNav;
