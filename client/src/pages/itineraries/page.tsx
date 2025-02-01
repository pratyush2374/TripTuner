import DynamicNavbar from "@/components/DynamicNavbar";
import ItinerariesSection from "./itinerary-components/Itineraries";
import ItinerariesHelmet from "./itinerary-components/ItinerariesHelmet";

const Itineraries: React.FC = () => {
    return (
        <>
        
            <DynamicNavbar home={true} />
            <ItinerariesHelmet />
            <ItinerariesSection />
        </>
    );
};

export default Itineraries;
