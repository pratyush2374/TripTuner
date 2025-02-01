import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItineraryOverview from "@/components/ItineraryOverview";

interface Itinerary {
    id: string;
    title: string;
    description: string;
    tags: string[];
    totalDays: number;
    destination: string;
    cost: number;
    likes: number;
    notes: string;
    isPublic: boolean;
    userId: string;
}

const UserItineraries: React.FC = () => {
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [loading, setLoading] = useState(false);
    const itinerariesGenerated = useSelector(
        (state: any) => state.itinerary.itineraries
    );

    async function getData() {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/my-itineraries`,
                {
                    withCredentials: true,
                }
            );
            setItineraries(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [itinerariesGenerated]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:w-[90%] mt-6">
            <h1 className="text-3xl font-bold mb-8">My Travel Itineraries</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map((itinerary) => (
                    <Link to={`/itinerary/${itinerary.id}`} key={itinerary.id}>
                        <ItineraryOverview key={itinerary.id} itinerary={itinerary} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserItineraries;
