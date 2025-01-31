import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const SeePublicItinerary: React.FC = () => {
    return (
        <div className="my-10 flex justify-center md:hidden">
            <Link
                to="/itineraries"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 font-semibold"
            >
                <span>See other itineraries</span>
                <ChevronRight className="w-5 h-5" />
            </Link>
        </div>
    );
};

export default SeePublicItinerary;
