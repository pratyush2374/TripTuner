import LandingNavbar from "./landing-page-components/LandingNavbar";
import ItineraryForm from "@/components/ItineraryForm";
import LandingHelmet from "./landing-page-components/LandingHelmet";
import Title from "@/components/Title";

const LandingPage: React.FC = () => {
    return (
        <>
            <LandingHelmet />
            <LandingNavbar />
            <main className="max-w-[1200px] flex flex-col md:flex-row sm:flex-col gap-12 justify-center mx-auto px-4 py-8 w-[90%] mt-10">
                <Title />
                <ItineraryForm />
            </main>
        </>
    );
};

export default LandingPage;
