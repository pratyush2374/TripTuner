import { Router } from "express";
import {
    generateItinerary,
    likeItinerary,
    editItinerary,
    getItineraries,
    getPlaces,
    validatePlace,
    getItinerary,
    unLikeItinerary,
} from "@/controllers/itinerary.controller";
import addUser from "@/middlewares/addUser.middleware";
import verifyJwt from "@/middlewares/verifyJwt.middleware";

const itineraryRouter = Router();

itineraryRouter.post("/generate", addUser, generateItinerary);
itineraryRouter.post("/:id/like", verifyJwt, likeItinerary);
itineraryRouter.post("/:id/unlike", verifyJwt, unLikeItinerary);
itineraryRouter.get("/:id", addUser, getItinerary);
itineraryRouter.post("/get-itineraries/:page", getItineraries);
itineraryRouter.get("/places", getPlaces);
itineraryRouter.post("/validate-place", validatePlace);
itineraryRouter.put("/edit/:id", addUser, editItinerary);

export default itineraryRouter;
