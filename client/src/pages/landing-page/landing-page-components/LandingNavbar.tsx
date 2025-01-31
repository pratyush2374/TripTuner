import React from "react";
import styles from "../landingPage.module.css";
import { Link } from "react-router-dom";

const LandingNavbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src="/TripTuner.svg" alt="Logo" className={styles.logo} />
                <p className={styles.brandName}>TripTuner</p>
            </div>
            <div className={styles.navLinks}>
                <Link to="/itineraries" className="hidden md:block font-[500]">
                    Itineraries
                </Link>
                <button className={styles.signInButton}>
                    <a href="/sign-in">Sign in / Sign up</a>
                </button>
            </div>
        </nav>
    );
};

export default LandingNavbar;
