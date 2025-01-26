import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import SignIn from "./pages/sign-in/page";
import SignUp from "./pages/sign-up/page";
import Landing from "@/pages/landing-page/page";
import Itinerary from "./pages/itinerary/page";

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/itinerary" element={<Itinerary />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
