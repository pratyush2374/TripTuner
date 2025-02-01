import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Calendar, IndianRupee, Heart } from "lucide-react";

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

interface ItineraryOverviewProps {
    itinerary: Itinerary;
}

const ItineraryOverview: React.FC<ItineraryOverviewProps> = ({ itinerary }) => {
    return (
        <>
            <Card
                key={itinerary.id}
                className="hover:shadow-lg transition-shadow duration-300 h-full"
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
                                {itinerary.cost.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ItineraryOverview;
