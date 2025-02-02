import React, { useEffect, useState } from "react";
import styles from "./component.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

const DynamicNavbar: React.FC<{ home: boolean }> = ({ home }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();
    const { toast } = useToast();

    useEffect(() => {
        const ate = localStorage.getItem("ate");
        const rte = localStorage.getItem("rte");
        if (ate && rte) {
            setIsLoggedIn(true);
        }
    }, []);
    const signOut = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/sign-out`,
                {
                    withCredentials: true,
                }
            );
            localStorage.removeItem("ate");
            localStorage.removeItem("rte");
            toast({
                title: "Success",
                description: "Signed out successfully",
                variant: "default",
            });
            window.location.href = "/sign-in";
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src="/TripTuner.svg" alt="Logo" className={styles.logo} />
                <p className={styles.brandName}>TripTuner</p>
            </div>
            <div className={styles.navLinks}>
                <Link to={home ? "/" : "/itineraries"} className="font-[500]">
                    {home ? "Home" : "Itineraries"}
                </Link>
                {isLoggedIn ? (
                    <button className={styles.signOutButton} onClick={signOut}>
                        <img src="/Logout.svg" alt="logout" />
                        <p>Sign out</p>
                    </button>
                ) : (
                    <button className={styles.signInButton}>
                        <Link to="/sign-in">Sign in / Sign up</Link>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default DynamicNavbar;
