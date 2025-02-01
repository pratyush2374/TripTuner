import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import SignIn from "./pages/sign-in/page";
import SignUp from "./pages/sign-up/page";
import Landing from "@/pages/landing-page/page";
import Itineraries from "./pages/itineraries/page";
import Dashboard from "./pages/dashboard/page";
import Itinerary from "./pages/itinerary/page";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/itineraries" element={<Itineraries />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/itinerary/:id" element={<Itinerary />} />
                </Routes>
            </Router>
            <Toaster />
        </>
    );
};

export default App;
