import LandingNavbar from "./landing-page-components/LandingNavbar";
import ItineraryForm from "@/components/ItineraryForm";
import LandingHelmet from "./landing-page-components/LandingHelmet";
import Title from "@/components/Title";
import ItinerarySection from "@/components/ItinerarySection";
import SeePublicItinerary from "./landing-page-components/SeePublicItinerary";

const LandingPage: React.FC = () => {
    return (
        <>
            <LandingHelmet />
            <LandingNavbar />
            <div className="max-w-[1200px] flex flex-col md:flex-row sm:flex-col gap-2 md:gap-12 justify-center mx-auto px-4 py-8 w-[90%] mt-10">
                <Title />
                <ItineraryForm />
            </div>
            <SeePublicItinerary />
            <ItinerarySection />
        </>
    );
};

export default LandingPage;
