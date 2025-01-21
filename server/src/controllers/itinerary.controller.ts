import { Request, Response } from "express";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/AsyncHandler";
import prisma from "@/utils/PrismaClient";
import ApiError from "@/utils/ApiError";
import createItinerary from "@/utils/CreateItenary";

interface ItineraryInput {
    destination: string;
    days: number;
    tourType: string;
    preferredActivities: string[];
    budget: string;
    modeOfTransport: string;
    activityLevel: string;
    customNote: string;
}

const generateItinerary = asyncHandler(async (req: Request, res: Response) => {
    const {
        destination,
        days,
        tourType,
        preferredActivities,
        budget,
        modeOfTransport,
        activityLevel,
        customNote,
    } = req.body as ItineraryInput;

    // Validate required fields
    if (!destination || !days || !tourType || !budget) {
        throw new ApiError(400, "Missing required fields");
    }

    // Create itinerary with retry logic
    let itineraryData = null;
    let attempts = 0;
    const startTime = Date.now();
    const MAX_DURATION = 30000; // 30 seconds

    

    while (!itineraryData && Date.now() - startTime < MAX_DURATION) {
        try {
            attempts++;
            itineraryData = await createItinerary({
                destination,
                days,
                tourType,
                preferredActivities,
                budget,
                modeOfTransport,
                activityLevel,
                customNote,
            });
        } catch (error: any) {
            if (Date.now() - startTime >= MAX_DURATION) {
                throw new ApiError(500, "Itinerary generation timed out");
            }
            console.error(`Attempt ${attempts} failed:`, error);
            // Small delay before retry
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    if (!itineraryData) {
        throw new ApiError(
            500,
            "Failed to generate itinerary after multiple attempts"
        );
    }

    // Create the itinerary in database
    const itinerary = await prisma.itinerary.create({
        data: {
            title: itineraryData.title,
            description: itineraryData.description,
            tags: itineraryData.tags,
            totalDays: itineraryData.totalDays,
            destination: itineraryData.destination,
            cost: itineraryData.cost,
            likes: 0,
            notes: itineraryData.notes,
            isPublic: true,
            days: {
                create: itineraryData.days.map((day: any) => ({
                    placesOrActivities: day.placesOrActivities,
                    dayNumber: day.dayNumber,
                    morning: day.morning,
                    afternoon: day.afternoon,
                    evening: day.evening,
                    cost: day.cost,
                })),
            },
            ...(req.user && { userId: req.user.id }),
        },
        include: {
            days: true,
        },
    });

    return res
        .status(201)
        .json(
            new ApiResponse(201, itinerary, "Itinerary generated successfully")
        );
});

const likeItinerary = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const itinerary = await prisma.itinerary.findUnique({
        where: { id },
    });

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    const updatedItinerary = await prisma.itinerary.update({
        where: { id },
        data: {
            likes: itinerary.likes + 1,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedItinerary,
                "Itinerary liked successfully"
            )
        );
});

const editItinerary = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        destination,
        days,
        tourType,
        preferredActivities,
        budget,
        modeOfTransport,
        activityLevel,
        customNote,
    } = req.body as ItineraryInput;

    // Check if itinerary exists
    const existingItinerary = await prisma.itinerary.findUnique({
        where: { id },
    });

    if (!existingItinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    // Generate new itinerary data
    let itineraryData = null;
    let attempts = 0;
    const startTime = Date.now();


    while (!itineraryData && Date.now() - startTime < 30000) {
        try {
            attempts++;
            itineraryData = await createItinerary({
                destination,
                days,
                tourType,
                preferredActivities,
                budget,
                modeOfTransport,
                activityLevel,
                customNote,
            });
        } catch (error: any) {
            if (Date.now() - startTime >= 30000) {
                throw new ApiError(500, "Itinerary update timed out");
            }
            console.error(`Attempt ${attempts} failed:`, error);
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }

    if (!itineraryData) {
        throw new ApiError(
            500,
            "Failed to update itinerary after multiple attempts"
        );
    }

    // Delete existing days
    await prisma.day.deleteMany({
        where: { itineraryId: id },
    });

    // Update itinerary with new data
    const updatedItinerary = await prisma.itinerary.update({
        where: { id },
        data: {
            title: itineraryData.title,
            description: itineraryData.description,
            tags: itineraryData.tags,
            totalDays: itineraryData.totalDays,
            destination: itineraryData.destination,
            cost: itineraryData.cost,
            notes: itineraryData.notes,
            days: {
                create: itineraryData.days.map((day: any) => ({
                    placesOrActivities: day.placesOrActivities,
                    dayNumber: day.dayNumber,
                    morning: day.morning,
                    afternoon: day.afternoon,
                    evening: day.evening,
                    cost: day.cost,
                })),
            },
        },
        include: {
            days: true,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedItinerary,
                "Itinerary updated successfully"
            )
        );
});

export { generateItinerary, likeItinerary, editItinerary };
