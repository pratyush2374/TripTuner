import React from "react";
import { useSelector } from "react-redux";
import {
    MapPin,
    Calendar,
    DollarSign,
    Save,
    ArrowRight,
    Tag,
    BookOpen,
} from "lucide-react";

const ItinerarySection: React.FC = () => {
    const itinerary = useSelector((state: any) => state.itinerary.itineraries);

    if (Object.keys(itinerary).length !== 0) {
        return (
            <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-12">
                <div className="max-w-4xl mx-auto space-y-8">
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
                                {itinerary.tags.map((tag: string) => (
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

                    {/* Daily Itinerary */}
                    <div className="space-y-6">
                        {itinerary.days.map((day: any) => (
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
                                        {
                                            period: "Morning",
                                            content: day.morning,
                                        },
                                        {
                                            period: "Afternoon",
                                            content: day.afternoon,
                                        },
                                        {
                                            period: "Evening",
                                            content: day.evening,
                                        },
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
                                        {day.placesOrActivities.map(
                                            (place: string) => (
                                                <span
                                                    key={place}
                                                    className="bg-royal-blue-100 text-royal-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    <BookOpen className="h-4 w-4" />
                                                    {place}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Notes Section */}
                    <div className="bg-white border border-royal-blue-100 rounded-2xl shadow-md">
                        <div className="bg-royal-blue-50 p-6">
                            <h3 className="text-2xl font-bold text-royal-blue-900 mb-4">
                                Important Notes
                            </h3>
                            <p className="text-royal-blue-600">
                                {itinerary.notes}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-full 
                        hover:bg-royal-blue-700 transition-colors flex items-center gap-2 
                        shadow-md hover:shadow-lg"
                            onClick={() => (window.location.reload())}
                        >
                            Generate Another Trip
                            <ArrowRight className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="bg-white border-2 border-royal-blue-600 text-royal-blue-600 
                        px-6 py-3 rounded-full hover:bg-royal-blue-50 transition-colors 
                        flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Save className="h-5 w-5" />
                            Save as PDF
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ItinerarySection;
