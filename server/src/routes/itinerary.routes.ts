import { Router } from "express";
import {
    generateItinerary,
    likeItinerary,
    editItinerary,
    getItineraries,
    getPlaces, 
    validatePlace
} from "@/controllers/itinerary.controller";
import addUser from "@/middlewares/addUser.middleware";

const itineraryRouter = Router();

itineraryRouter.post("/generate", addUser, generateItinerary);
itineraryRouter.post("/:id/like", likeItinerary);
itineraryRouter.put("/:id", addUser, editItinerary);
itineraryRouter.post("/get-itineraries/:page", getItineraries);
itineraryRouter.get("/places", getPlaces);
itineraryRouter.post("/validate-place", validatePlace)

export default itineraryRouter;
