import ItineraryForm from "@/components/ItineraryForm";
import DashboardNavbar from "./dashboard-components/DashboardNavbar";
import HelmetSection from "./dashboard-components/HelmetSection";
import UserItineraries from "./dashboard-components/UserItineraries";
import ItinerarySection from "@/components/ItinerarySection";
import Title from "./dashboard-components/Title";

const Dashboard: React.FC = () => {
    return (
        <>
            <HelmetSection />
            <DashboardNavbar />
            <div className="mt-28 w-[90%] m-auto">
                <Title />
                <ItineraryForm  />
            </div>
            <ItinerarySection />
            <UserItineraries />

        </>
    );
};

export default Dashboard;
