import LandingNavbar from "../landing-page/landing-page-components/LandingNavbar";
import ItinerarySection from "./itinerary-components/Itinerary";
import ItineraryHelmet from "./itinerary-components/ItineraryHelmet";

const Itineraries: React.FC = () => {
    return (
        <>
            <LandingNavbar />
            <ItineraryHelmet />
            <ItinerarySection />
        </>
    );
};

export default Itineraries;
