import DynamicNavbar from "@/components/DynamicNavbar";
import ItineraryOverview from "@/components/ItineraryOverview";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const SearchPage: React.FC = () => {
    const { place } = useParams();
    const [itineraries, setItineraries] = useState([]);
    const { toast } = useToast();

    const getItineraries = async () => {
        try {
            const res = await axios.get(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/itinerary/get-itineraries-from-place/${place}`
            );

            setItineraries(res.data.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Couldn't get itineraries",
                variant: "destructive",
            });
        }
    };
    useEffect(() => {
        getItineraries();
    }, [place]);
    return (
        <>
            <DynamicNavbar home={false} />
            <div className="container mx-auto px-4 py-8 md:w-[90%] mt-16">
                <h1 className="text-3xl md:text-4xl font-bold my-10">Itineraries from {place}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.length > 0 ? (
                        itineraries.map((itinerary: any) => (
                            <Link
                                to={`/itinerary/${itinerary.id}`}
                                key={itinerary.id}
                            >
                                <ItineraryOverview
                                    key={itinerary.id}
                                    itinerary={itinerary}
                                />
                            </Link>
                        ))
                    ) : (
                        <div>There are no itineraries</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
