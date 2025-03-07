import { Request, Response } from "express";
import ApiResponse from "@/utils/ApiResponse";
import asyncHandler from "@/utils/AsyncHandler";
import prisma from "@/utils/PrismaClient";
import ApiError from "@/utils/ApiError";
import createItinerary from "@/utils/CreateItenary";
import checkDestination from "@/utils/checkDestination";

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

    await prisma.destination.create({
        data: {
            destination: destination,
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

    if (!id) {
        throw new ApiError(400, "Missing itinerary id");
    }

    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }

    const itinerary = await prisma.itinerary.findUnique({
        where: { id },
    });

    await prisma.user.update({
        where: { id: user.id },
        data: {
            likedItineraries: { push: id },
        },
    });

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    await prisma.itinerary.update({
        where: { id },
        data: {
            likes: itinerary.likes + 1,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Itinerary liked successfully"));
});

const unLikeItinerary = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Missing itinerary id");
    }
    const user = req.user;

    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }

    const itinerary = await prisma.itinerary.findUnique({
        where: { id },
    });

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            likedItineraries: {
                set: user.likedItineraries.filter(
                    (itineraryId) => itineraryId !== id
                ),
            },
        },
    });

    await prisma.itinerary.update({
        where: { id },
        data: {
            likes: itinerary.likes - 1,
            userId: user.id,
        },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Itinerary unliked successfully"));
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

const getItineraries = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.params.page, 10);

    if (isNaN(page) || page < 1) {
        throw new ApiError(400, "Invalid page number");
    }

    const itemsPerPage = 9;
    const skip = (page - 1) * itemsPerPage;

    // Fetch itineraries without the 'days' field
    const itineraries = await prisma.itinerary.findMany({
        skip,
        take: itemsPerPage,
        select: {
            id: true,
            title: true,
            description: true,
            tags: true,
            totalDays: true,
            destination: true,
            cost: true,
            likes: true,
            notes: true,
            isPublic: true,
            userId: true,
        },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                itineraries,
                "Itineraries fetched successfully"
            )
        );
});

const getPlaces = asyncHandler(async (req: Request, res: Response) => {
    const place = req.params.place;

    if (!place || typeof place !== "string") {
        return res.status(400).json(new ApiError(400, "Invalid place"));
    }

    const matchedPlaces = await prisma.destination.findMany({
        where: {
            destination: {
                contains: place,
                mode: "insensitive",
            },
        },
    });

    const places = matchedPlaces.map((place) => place.destination);

    return res.status(200).json(places);
});

const validatePlace = asyncHandler(async (req: Request, res: Response) => {
    const { destination } = req.body;

    if (!destination) {
        return res.status(400).json(new ApiError(400, "Invalid destination"));
    }

    const isValid = await checkDestination(destination);

    if (!isValid) {
        return res.status(400).json(new ApiError(400, "Invalid destination"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Destination is valid"));
});

const getItinerary = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!id) {
        return res.status(400).json(new ApiError(400, "Invalid id"));
    }

    let isLiked = false;
    if (user && user.id) {
        const userInDb = await prisma.user.findUnique({
            where: { id: user.id },
        });

        userInDb?.likedItineraries.map((itinerary) => {
            if (itinerary === id) {
                isLiked = true;
            }
        });
    }

    const itinerary = await prisma.itinerary.findUnique({
        where: { id },
        include: {
            days: true,
        },
    });

    if (!itinerary) {
        return res.status(404).json(new ApiError(404, "Itinerary not found"));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { ...itinerary, isLiked },
                "Itinerary fetched successfully"
            )
        );
});

const getItinerariesFromPlace = asyncHandler(
    async (req: Request, res: Response) => {
        const place = req.params.place;
        if (!place) {
            return res.status(400).json(new ApiError(400, "Invalid place"));
        }

        const itineraries = await prisma.itinerary.findMany({
            where: {
                destination: {
                    equals: place,
                    mode: "insensitive",
                },
            },
        });

        if (!itineraries) {
            return res
                .status(404)
                .json(new ApiError(404, "Itineraries not found"));
        }

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    itineraries,
                    "Itineraries fetched successfully"
                )
            );
    }
);

export {
    generateItinerary,
    likeItinerary,
    editItinerary,
    getItineraries,
    getPlaces,
    validatePlace,
    getItinerary,
    unLikeItinerary,
    getItinerariesFromPlace,
};
