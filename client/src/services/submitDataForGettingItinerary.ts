import { ItineraryInput, ItineraryResponse } from "@/components/types";
import { updateItineraries } from "@/features/itinerarySlice";
import axios from "axios";
import { useDispatch } from "react-redux";

const submitDataForGettingItinerary = async (
    data: ItineraryInput,
    dispatch: ReturnType<typeof useDispatch>
) => {
    try {
        const response = await axios.post<ItineraryResponse>(
            import.meta.env.VITE_SERVER_URL + "/api/itinerary/generate",
            data
        );

        if (response.data.success) {
            dispatch(updateItineraries(response.data.data));
            return response.data;
        } else {
            throw new Error(
                response.data.message || "Itinerary generation failed"
            );
        }
    } catch (error) {
        console.error("Itinerary submission error:", error);
        return error;
    }
};

export default submitDataForGettingItinerary;
