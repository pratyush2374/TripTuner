import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet

const ItinerariesHelmet: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Your Customized Travel Itineraries</title>

                <meta
                    name="description"
                    content="Create your detailed travel itineraries with TripTuner. Plan each day of your trips, organize activities, and explore tailored recommendations for your destinations."
                />

                <meta
                    name="keywords"
                    content="itinerary planner, travel itineraries, trip planning, daily travel plans, vacation schedules, travel organizer"
                />

                <meta
                    property="og:title"
                    content="TripTuner - Your Customized Travel Itineraries"
                />
                <meta
                    property="og:description"
                    content="Plan your trips efficiently with our customizable itinerary maker. Organize your travel schedules, add activities, and manage your itineraries with ease."
                />
                <meta
                    property="og:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/itineraries`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="TripTuner - Your Customized Travel Itineraries"
                />
                <meta
                    name="twitter:description"
                    content="Organize your travel plans, create detailed itineraries, and explore tailored travel recommendations with TripTuner."
                />
                <meta
                    name="twitter:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/TripTuner.svg`}
                />
                <meta
                    name="twitter:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/itineraries`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/itineraries`}
                />
            </Helmet>
        </>
    );
};

export default ItinerariesHelmet;
