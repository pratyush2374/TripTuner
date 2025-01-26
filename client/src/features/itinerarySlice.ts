import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItineraryInput, Itinerary } from "@/components/types";

const initialState = {
    step: 1,
    formData: {
        destination: "",
        days: 0,
        tourType: "",
        preferredActivities: [],
        budget: "",
        currency: "",
        modeOfTransport: "",
        activityLevel: "",
        customNote: "",
    } as ItineraryInput,
    itineraries: {} as Itinerary,
};

const itinerarySlice = createSlice({
    name: "itinerary",
    initialState,
    reducers: {
        updateFormData: (
            state,
            action: PayloadAction<Partial<ItineraryInput>>
        ) => {
            state.formData = {
                ...state.formData,
                ...action.payload,
            };
        },

        updateItineraries: (state, action: PayloadAction<Itinerary>) => {
            state.itineraries = { ...action.payload };
        },
        nextStep: (state) => {
            state.step++;
        },
        prevStep: (state) => {
            if (state.step > 1) {
                state.step--;
            }
        },
    },
});

export const { updateFormData, updateItineraries, nextStep, prevStep } =
    itinerarySlice.actions;
export default itinerarySlice.reducer;
