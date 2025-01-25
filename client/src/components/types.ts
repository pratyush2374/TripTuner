// types.ts
export interface ItineraryInput {
    destination: string;
    days: number;
    tourType: string;
    preferredActivities: string[];
    budget: string;
    currency: string;
    modeOfTransport: string;
    activityLevel: string;
    customNote: string;
}

export interface Day {
    id: string;
    placesOrActivities: string[];
    dayNumber: number;
    morning: string;
    afternoon: string;
    evening: string;
    cost: number;
    itineraryId: string;
}

export interface ItineraryResponse {
    statusCode: number;
    data: {
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
        userId: string | null;
        days: Day[];
    };
    message: string;
    success: boolean;
}

export interface Itinerary {
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
    userId: string | null;
    days: Day[];
}