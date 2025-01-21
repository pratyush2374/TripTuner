import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet
import SignInForm from "./sign-in-components/SignInForm";

const SignIn: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>TripTuner - Sign In to Access Your Travel Plans</title>

                <meta
                    name="description"
                    content="Sign in to your TripTuner account to manage your itineraries, organize trips, and explore destinations effortlessly. Access your travel dashboard now."
                />

                <meta
                    name="keywords"
                    content="sign in, log in, access account, travel planner, itinerary maker, trip management"
                />

                <meta
                    property="og:title"
                    content="Sign In to TripTuner - Plan Your Dream Journey"
                />
                <meta
                    property="og:description"
                    content="Log in to your TripTuner account to access personalized travel-planning tools. Organize, manage, and enhance your trips with ease."
                />
                <meta
                    property="og:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/public/TripTuner.svg`}
                />
                <meta
                    property="og:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/signin`}
                />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="Sign In to TripTuner - Plan Your Dream Journey"
                />
                <meta
                    name="twitter:description"
                    content="Log in to your TripTuner account to access personalized travel-planning tools. Organize, manage, and enhance your trips with ease."
                />
                <meta
                    name="twitter:image"
                    content={`${
                        import.meta.env.VITE_FRONTEND_URL
                    }/public/TripTuner.svg`}
                />
                <meta
                    name="twitter:url"
                    content={`${import.meta.env.VITE_FRONTEND_URL}/signin`}
                />

                <meta name="author" content="TripTuner Team" />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`${import.meta.env.VITE_FRONTEND_URL}/signin`}
                />
            </Helmet>

            <SignInForm />
        </>
    );
};

export default SignIn;
