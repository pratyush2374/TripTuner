import { configureStore } from "@reduxjs/toolkit";
import ItineraryReducer from "@/features/itinerarySlice"
export const store = configureStore({
    reducer : {
        itinerary : ItineraryReducer
    }
});
