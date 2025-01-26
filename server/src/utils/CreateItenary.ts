import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface ItineraryInput {
    destination: string;
    days: number;
    tourType: string;
    preferredActivities?: string[];
    budget: string;
    modeOfTransport?: string;
    activityLevel?: string;
    customNote?: string;
}

interface DayPlan {
    dayNumber: number;
    morning: string;
    afternoon: string;
    evening: string;
    placesOrActivities: string[];
    cost: number;
}

interface ItineraryOutput {
    title: string;
    description: string;
    destination: string;
    totalDays: number;
    cost: number;
    tags: string[];
    notes: string;
    days: DayPlan[];
}

const createItinerary = async (
    input: ItineraryInput
): Promise<ItineraryOutput> => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    // Define the schema for the itinerary response
    const schema = {
        type: SchemaType.OBJECT,
        properties: {
            title: {
                type: SchemaType.STRING,
                description: "Catchy title for the itinerary",
            },
            description: {
                type: SchemaType.STRING,
                description: "Brief overview of the itinerary",
            },
            destination: {
                type: SchemaType.STRING,
                description: "Main destination",
            },
            totalDays: {
                type: SchemaType.NUMBER,
                description: "Total number of days",
            },
            cost: {
                type: SchemaType.NUMBER,
                description: "Estimated total cost in INR",
            },
            tags: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.STRING,
                },
                description: "Relevant tags for the itinerary",
            },
            notes: {
                type: SchemaType.STRING,
                description: "Additional notes or recommendations",
            },
            days: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        dayNumber: {
                            type: SchemaType.NUMBER,
                            description: "Day number in the itinerary",
                        },
                        morning: {
                            type: SchemaType.STRING,
                            description: "Morning activities",
                        },
                        afternoon: {
                            type: SchemaType.STRING,
                            description: "Afternoon activities",
                        },
                        evening: {
                            type: SchemaType.STRING,
                            description: "Evening activities",
                        },
                        placesOrActivities: {
                            type: SchemaType.ARRAY,
                            items: {
                                type: SchemaType.STRING,
                            },
                            description:
                                "List of places or activities for the day",
                        },
                        cost: {
                            type: SchemaType.NUMBER,
                            description: "Estimated cost for the day in USD",
                        },
                    },
                    required: [
                        "dayNumber",
                        "morning",
                        "afternoon",
                        "evening",
                        "placesOrActivities",
                        "cost",
                    ],
                },
            },
        },
        required: [
            "title",
            "description",
            "destination",
            "totalDays",
            "cost",
            "tags",
            "notes",
            "days",
        ],
    };

    // Configure the model
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    });

    // Create the prompt
    const prompt = `Create a detailed travel itinerary for ${
        input.destination
    } for ${input.days} days.
    Tour Type: ${input.tourType}
    Budget: ${input.budget}
    ${
        input.preferredActivities
            ? `Preferred Activities: ${input.preferredActivities.join(", ")}`
            : ""
    }
    ${
        input.modeOfTransport
            ? `Mode of Transport: ${input.modeOfTransport}`
            : ""
    }
    ${input.activityLevel ? `Activity Level: ${input.activityLevel}` : ""}
    ${input.customNote ? `Additional Notes: ${input.customNote}` : ""}
    
    Please provide a day-by-day breakdown with morning, afternoon, and evening activities, including estimated costs.`;

    // Generate the itinerary
    const result = await model.generateContent(prompt);
    const itineraryData = JSON.parse(result.response.text());

    return itineraryData;
};

export default createItinerary;
