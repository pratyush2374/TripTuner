import { Helmet } from "react-helmet-async"; // Import Helmet

const LandingHelmet: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Plan Your Perfect Trip with Ease</title>

                <meta
                    name="description"
                    content="TripTuner helps you craft personalized itineraries, manage your trips, and explore new destinations. Start planning your dream journey today!"
                />

                <meta
                    name="keywords"
                    content="trip planner, itinerary maker, travel planning, personalized trips, organize travel, plan trips"
                />

                <meta
                    property="og:title"
                    content="TripTuner - Plan Your Perfect Trip"
                />
                <meta
                    property="og:description"
                    content="Easily create personalized itineraries, organize your travel plans, and explore new destinations with TripTuner."
                />
                <meta
                    property="og:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="TripTuner - Plan Your Perfect Trip"
                />
                <meta
                    name="twitter:description"
                    content="Easily create personalized itineraries, organize your travel plans, and explore new destinations with TripTuner."
                />
                <meta
                    name="twitter:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/TripTuner.svg`}
                />
                <meta
                    name="twitter:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}`}
                />
            </Helmet>
        </>
    );
};

export default LandingHelmet;
