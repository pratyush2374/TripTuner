import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
    MapPin,
    Calendar,
    DollarSign,
    Save,
    Heart,
    Tag,
    BookOpen,
    ArrowRight,
} from "lucide-react";

interface APIResponse {
    statusCode: number;
    data: ItineraryData;
    message: string;
    success: boolean;
}

interface ItineraryData {
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
    days: DayItinerary[];
    isLiked: boolean;
}

interface DayItinerary {
    id: string;
    placesOrActivities: string[];
    dayNumber: number;
    morning: string;
    afternoon: string;
    evening: string;
    cost: number;
    itineraryId: string;
}

const Itinerary: React.FC = () => {
    const { id } = useParams();
    const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsliked] = useState(false);
    const { toast } = useToast();

    const getItinerary = async () => {
        try {
            setLoading(true);
            const response = await axios.get<APIResponse>(
                `${import.meta.env.VITE_SERVER_URL}/api/itinerary/${id}`,
                {
                    withCredentials: true,
                }
            );
            setItinerary(response.data.data);
            setLikes(response.data.data.likes);
            setIsliked(response.data.data.isLiked);
        } catch (error) {
            toast({
                title: "Error",
                description: "Couldn't get itinerary",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getItinerary();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    const handleLike = async () => {
        try {
            if (isLiked) {
                setIsliked(false);
                setLikes(likes - 1);
                await axios.post(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/itinerary/${id}/unlike`,
                    {},
                    {
                        withCredentials: true,
                    }
                );
            } else {
                setIsliked(true);
                setLikes(likes + 1);
                await axios.post(
                    `${
                        import.meta.env.VITE_SERVER_URL
                    }/api/itinerary/${id}/like`,
                    {},
                    {
                        withCredentials: true,
                    }
                );
            }
        } catch (error) {
            setLikes(likes - 1);
            toast({
                title: "Error",
                description: "Sign in to like",
                variant: "destructive",
            });
        }
    };

    if (!itinerary)
        return (
            <div className="min-h-screen bg-white flex items-center justify-center flex-col">
                <div className="text-center p-10 bg-blue-50 rounded-2xl shadow-xl">
                    <h2 className="text-4xl font-bold text-royal-blue-800 mb-4">
                        No Itinerary Found
                    </h2>
                    <p className="text-royal-blue-600">
                        Create your dream journey and explore the world!
                    </p>
                </div>
                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-full 
              hover:bg-royal-blue-700 transition-colors flex items-center gap-2 
              shadow-md hover:shadow-lg mt-8"
                    onClick={() => <Navigate to="/" />}
                >
                    Generate
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        );

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between space-x-4">
                    <button
                        className="bg-white border-2 border-royal-blue-600 text-royal-blue-600 px-6 py-3 rounded-full hover:bg-royal-blue-50 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                        onClick={() => window.print()}
                    >
                        <Save className="h-5 w-5" />
                        Save as PDF
                    </button>

                    <button
                        className="bg-white border-2 border-royal-blue-600 text-royal-blue-600 px-6 py-3 rounded-full hover:bg-royal-blue-50 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                        onClick={handleLike}
                    >
                        <Heart
                            className={`h-5 w-5 ${
                                isLiked ? "text-red-600" : ""
                            }`}
                        />
                        {likes}
                    </button>
                </div>
                <div className="bg-white border-2 border-royal-blue-100 rounded-2xl shadow-lg overflow-hidden">
                    <div className="bg-royal-blue-50 p-6 border-b border-royal-blue-100">
                        <h1 className="text-4xl font-extrabold text-royal-blue-900">
                            {itinerary.title}
                        </h1>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-royal-blue-700">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-royal-blue-500" />
                                <span>{itinerary.destination}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-royal-blue-500" />
                                <span>{itinerary.totalDays} Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-royal-blue-500" />
                                <span>{itinerary.cost} INR</span>
                            </div>
                        </div>
                        <p className="mt-4 text-royal-blue-600">
                            {itinerary.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {itinerary.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-royal-blue-100 text-royal-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                                >
                                    <Tag className="h-4 w-4" />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {itinerary.days.map((day) => (
                        <div
                            key={day.id}
                            className="bg-white border border-royal-blue-100 rounded-2xl shadow-md overflow-hidden p-3 md:p-5"
                        >
                            <div className="bg-royal-blue-50 p-4 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-royal-blue-900">
                                    Day {day.dayNumber}
                                </h3>
                                <div className="text-royal-blue-600">
                                    Estimated Cost: {day.cost} INR
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                {[
                                    { period: "Morning", content: day.morning },
                                    {
                                        period: "Afternoon",
                                        content: day.afternoon,
                                    },
                                    { period: "Evening", content: day.evening },
                                ].map(({ period, content }) => (
                                    <div
                                        key={period}
                                        className="border-b border-royal-blue-100 pb-4 last:border-b-0"
                                    >
                                        <h4 className="text-xl font-semibold text-royal-blue-700 mb-2">
                                            {period}
                                        </h4>
                                        <p className="text-royal-blue-600">
                                            {content}
                                        </p>
                                    </div>
                                ))}
                                <div className="flex flex-wrap gap-2">
                                    {day.placesOrActivities.map((place) => (
                                        <span
                                            key={place}
                                            className="bg-royal-blue-100 text-royal-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                                            <BookOpen className="h-4 w-4" />
                                            {place}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-royal-blue-100 rounded-2xl shadow-md">
                    <div className="bg-royal-blue-50 p-6">
                        <h3 className="text-2xl font-bold text-royal-blue-900 mb-4">
                            Important Notes
                        </h3>
                        <p className="text-royal-blue-600">{itinerary.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
