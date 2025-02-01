import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Calendar, IndianRupee, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
                    <Link to={`/itinerary/${itinerary.id}`}>
                        <Card
                            key={itinerary.id}
                            className="hover:shadow-lg transition-shadow duration-300"
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg mb-2">
                                            {itinerary.title}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {itinerary.destination}
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600">
                                        <Heart className="w-4 h-4" />
                                        <span>{itinerary.likes}</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {itinerary.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {itinerary.tags.slice(0, 4).map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {itinerary.tags.length > 4 && (
                                        <span className="text-gray-500 text-xs px-2 py-1">
                                            +{itinerary.tags.length - 4} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{itinerary.totalDays} days</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IndianRupee className="w-4 h-4" />
                                        <span>
                                            {itinerary.cost.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserItineraries;
