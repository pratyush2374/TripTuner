import React, { useState } from "react";
import LandingNavbar from "./landing-page-components/LandingNavbar";
import { ItineraryForm } from "@/components/ItineraryForm";
import LandingHelmet from "./landing-page-components/LandingHelmet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, DollarSign, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ItineraryDay {
    id: string;
    dayNumber: number;
    morning: string;
    afternoon: string;
    evening: string;
    cost: number;
    placesOrActivities: string[];
}

interface ItineraryResponse {
    statusCode: number;
    data: {
        id: string;
        title: string;
        description: string;
        tags: string[];
        totalDays: number;
        destination: string;
        cost: number;
        notes: string;
        days: ItineraryDay[];
    };
    message: string;
    success: boolean;
}

const LandingPage: React.FC = () => {
    const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);

    const handleSuccess = (response: ItineraryResponse) => {
        setItinerary(response);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <LandingHelmet />
            <LandingNavbar />d
            <main className="container mx-auto px-4 py-8 w-[90%] md:w-[75%]">
                {!itinerary && <ItineraryForm onSuccess={handleSuccess} />}

                {itinerary && (
                    <div id="itinerary-result" className="mt-12 space-y-8">
                        {/* Itinerary Header */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-3xl font-bold">
                                    {itinerary.data.title}
                                </CardTitle>
                                <div className="flex items-center gap-4 text-muted-foreground mt-2">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {itinerary.data.destination}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {itinerary.data.totalDays} days
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="h-4 w-4" />
                                        {itinerary.data.cost} INR
                                    </div>
                                </div>
                                <p className="mt-4 text-muted-foreground">
                                    {itinerary.data.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {itinerary.data.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Daily Itinerary */}
                        <div className="space-y-6">
                            {itinerary.data.days.map((day) => (
                                <Card key={day.id}>
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-4">
                                            Day {day.dayNumber}
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-medium text-primary">
                                                    Morning
                                                </h4>
                                                <p className="mt-1">
                                                    {day.morning}
                                                </p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h4 className="font-medium text-primary">
                                                    Afternoon
                                                </h4>
                                                <p className="mt-1">
                                                    {day.afternoon}
                                                </p>
                                            </div>
                                            <Separator />
                                            <div>
                                                <h4 className="font-medium text-primary">
                                                    Evening
                                                </h4>
                                                <p className="mt-1">
                                                    {day.evening}
                                                </p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex flex-wrap gap-2">
                                                        {day.placesOrActivities.map(
                                                            (place) => (
                                                                <Badge
                                                                    key={place}
                                                                    variant="outline"
                                                                >
                                                                    {place}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="text-muted-foreground">
                                                        Estimated Cost:{" "}
                                                        {day.cost} INR
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Notes Section */}
                        <Card>
                            <CardContent className="pt-6">
                                <h3 className="font-semibold mb-2">
                                    Important Notes
                                </h3>
                                <p className="text-muted-foreground">
                                    {itinerary.data.notes}
                                </p>
                            </CardContent>
                        </Card>

                        <Button
                            onClick={() => setItinerary(null)}
                            className="mr-4 bg-blue-500"
                        >
                            Generate Another Trip
                        </Button>
                        <Button onClick={() => window.print()}>
                            <Save />
                            Save as pdf
                        </Button>
                    </div>
                )}
            </main>
        </>
    );
};

export default LandingPage;
