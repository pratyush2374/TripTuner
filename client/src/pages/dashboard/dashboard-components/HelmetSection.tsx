import { Helmet } from "react-helmet-async";

const HelmetSection: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Plan Your Perfect Trip</title>

                <meta
                    name="description"
                    content="Craft your perfect itinerary with TripTuner. Plan, organize, and optimize your travel experiences effortlessly."
                />

                <meta
                    name="keywords"
                    content="itinerary planner, travel planning, trip organizer, personalized travel, travel optimization"
                />

                <meta
                    property="og:title"
                    content="TripTuner - Plan Your Perfect Trip"
                />
                <meta
                    property="og:description"
                    content="Craft your perfect itinerary with TripTuner. Plan, organize, and optimize your travel experiences effortlessly."
                />
                <meta
                    property="og:image"
                    content={`$${import.meta.env.VITE_FRONTEND_URL}/public/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/home`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="TripTuner - Plan Your Perfect Trip"
                />
                <meta
                    name="twitter:description"
                    content="Craft your perfect itinerary with TripTuner. Plan, organize, and optimize your travel experiences effortlessly."
                />
                <meta
                    name="twitter:image"
                    content={`$${import.meta.env.VITE_FRONTEND_URL}/public/TripTuner.svg`}
                />
                <meta
                    name="twitter:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/home`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/home`}
                />
            </Helmet>
        </>
    );
};

export default HelmetSection;
