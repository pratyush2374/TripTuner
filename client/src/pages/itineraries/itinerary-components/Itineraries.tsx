import ItineraryOverview from "@/components/ItineraryOverview";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ItinerariesSection: React.FC = () => {
    const { page } = useParams();
    const [data, setData] = useState([]);
    const { toast } = useToast();
    const getData = async () => {
        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_SERVER_URL
                }/api/itinerary/get-itineraries/${page}`
            );

            setData(res.data.data);
        } catch (error) {
            toast({
                title: "Error",
                description: "Couldn't get itineraries",
                variant: "destructive",
            });
        }
    };

    useEffect(() => {
        getData();
    }, [page]);
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:w-[90%] mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.length > 0 ? (
                        data.map((itinerary: any) => (
                            <Link to={`/itinerary/${itinerary.id}`} key={itinerary.id}>
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
            <Pagination className="mx-auto w-fit mt-6 mb-12">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href={
                                Number(page) == 1
                                    ? "/itineraries/1"
                                    : `/itineraries/${Number(page) - 1}`
                            }
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/itineraries/1">1</PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink href="/itineraries/2">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="/itineraries/3">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            href={`/itineraries/${Number(page) + 1}`}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
};

export default ItinerariesSection;
