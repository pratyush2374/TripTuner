import React, { useEffect, useState } from "react";
import styles from "@/pages/landing-page/landingPage.module.css";
import { Link } from "react-router-dom";

const DynamicNavbar: React.FC<{ home: boolean }> = ({ home }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    useEffect(() => {
        const ate = localStorage.getItem("ate");
        const rte = localStorage.getItem("rte");
        if (ate && rte) {
            setIsLoggedIn(true);
        }
    }, []);
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src="/TripTuner.svg" alt="Logo" className={styles.logo} />
                <p className={styles.brandName}>TripTuner</p>
            </div>
            <div className={styles.navLinks}>
                <Link
                    to={home ? "/" : "/itineraries"}
                    className="hidden md:block font-[500]"
                >
                    {home ? "Home" : "Itineraries"}
                </Link>
                {isLoggedIn ? (
                    <button className={styles.signOutButton}>
                        <img src="/Logout.svg" alt="logout" />
                        <a href="/sign-in">Sign out</a>
                    </button>
                ) : (
                    <button className={styles.signInButton}>
                        <a href="/sign-in">Sign in / Sign up</a>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default DynamicNavbar;
