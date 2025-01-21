import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import SignUpForm from "./sign-up-components/SignUpForm";

const SignUp: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Sign Up and Plan Your Perfect Trip</title>

                <meta
                    name="description"
                    content="Create your TripTuner account to craft personalized itineraries, manage your travel plans, and explore new destinations effortlessly."
                />

                <meta
                    name="keywords"
                    content="sign up, create account, travel planner, itinerary maker, trip planning, personalized trips, travel management"
                />

                <meta
                    property="og:title"
                    content="Sign Up for TripTuner - Plan Your Dream Journey"
                />
                <meta
                    property="og:description"
                    content="Join TripTuner to access powerful trip-planning tools. Design, organize, and optimize your travel plans with ease."
                />
                <meta
                    property="og:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/public/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/signup`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Sign Up for TripTuner - Plan Your Dream Journey"
                />
                <meta
                    name="twitter:description"
                    content="Join TripTuner to access powerful trip-planning tools. Design, organize, and optimize your travel plans with ease."
                />
                <meta
                    name="twitter:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/public/TripTuner.svg`}
                />
                <meta
                    name="twitter:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/signup`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/signup`}
                />
            </Helmet>

            <SignUpForm />
        </>
    );
};

export default SignUp;
