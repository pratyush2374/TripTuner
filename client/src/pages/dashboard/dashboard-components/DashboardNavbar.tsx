import { useToast } from "@/hooks/use-toast";
import styles from "@/pages/landing-page/landingPage.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardNavbar: React.FC = () => {
    const { toast } = useToast();
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
        <>
            <nav className={styles.navbar}>
                <div className={styles.logoContainer}>
                    <img
                        src="/TripTuner.svg"
                        alt="Logo"
                        className={styles.logo}
                    />
                    <p className={styles.brandName}>TripTuner</p>
                </div>
                <div className={styles.navLinks}>
                    <Link
                        to="/itineraries"
                        className="hidden md:block font-[500]"
                    >
                        Itineraries
                    </Link>
                    <button className={styles.signOutButton} onClick={signOut}>
                        <img src="/Logout.svg" alt="logout" />
                        <p>Sign out</p>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default DashboardNavbar;
