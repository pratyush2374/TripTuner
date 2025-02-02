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
import SearchPage from "./pages/search/page";
import { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
    const refreshTokens = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/refresh-tokens`,
                { withCredentials: true }
            );

            if (response.status === 200) {
                localStorage.setItem(
                    "ate",
                    response.data.data.accessTokenExpiry.toString()
                );
                localStorage.setItem(
                    "rte",
                    response.data.data.refreshTokenExpiry.toString()
                );
            }
        } catch (error: any) {
            console.warn("Error refreshing tokens:");
        }
    };
    

    const logout = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/sign-out`,
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error logging out");
        }
    };

    useEffect(() => {
        const refreshInterval = setInterval(async () => {
            try {
                const accessTokenExpiry = Number(localStorage.getItem("ate"));
                const refreshTokenExpiry = Number(localStorage.getItem("rte"));
                const currentTime = Date.now();

                if (refreshTokenExpiry <= currentTime) {
                    // If the refresh token has expired, log out
                    console.warn("Refresh token expired. Logging out.");
                    logout();
                    return; // Exit the function
                }

                if (accessTokenExpiry - currentTime <= 5 * 60 * 1000) {
                    await refreshTokens();
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
                logout();
            }
        }, 10 * 60 * 1000);
        return () => clearInterval(refreshInterval); // Clean up on component unmount
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

    useEffect(() => {
        const ate = localStorage.getItem("ate");
        const rte = localStorage.getItem("rte");
        if (ate && rte) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <Landing />
                            )
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <SignIn />
                            )
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <SignUp />
                            )
                        }
                    />
                    <Route
                        path="/itineraries/:page"
                        element={<Itineraries />}
                    />
                    <Route
                        path="/itineraries"
                        element={<Navigate to="/itineraries/1" />}
                    />
                    <Route
                        path="/dashboard"
                        element={
                            isLoggedIn ? (
                                <Dashboard />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route path="/itinerary/:id" element={<Itinerary />} />
                    <Route path="/search/:place" element={<SearchPage />} />
                </Routes>
            </Router>
            <Toaster />
        </>
    );
};

export default App;
