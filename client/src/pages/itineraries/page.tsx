import DynamicNavbar from "@/components/DynamicNavbar";
import ItinerariesSection from "./itinerary-components/Itineraries";
import ItinerariesHelmet from "./itinerary-components/ItinerariesHelmet";
import SearchSection from "./itinerary-components/SearchSection";

const Itineraries: React.FC = () => {
    return (
        <>
            <ItinerariesHelmet />
            <SearchSection />
            <DynamicNavbar home={true} />
            <ItinerariesSection />
        </>
    );
};

export default Itineraries;
