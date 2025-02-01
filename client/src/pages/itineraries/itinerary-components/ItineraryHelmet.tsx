import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet

const ItineraryHelmet: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Your Customized Travel Itinerary</title>

                <meta
                    name="description"
                    content="Create your detailed travel itinerary with TripTuner. Plan each day of your trip, organize activities, and explore tailored recommendations for your destinations."
                />

                <meta
                    name="keywords"
                    content="itinerary planner, travel itinerary, trip planning, daily travel plans, vacation schedule, travel organizer"
                />

                <meta
                    property="og:title"
                    content="TripTuner - Your Customized Travel Itinerary"
                />
                <meta
                    property="og:description"
                    content="Plan your trip efficiently with our customizable itinerary maker. Organize your travel schedule, add activities, and manage your trips with ease."
                />
                <meta
                    property="og:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/itinerary`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="TripTuner - Your Customized Travel Itinerary"
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
                    content={`${import.meta.env.VITE_FRONTEND_URL}/itinerary`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/itinerary`}
                />
            </Helmet>
        </>
    );
};

export default ItineraryHelmet;
