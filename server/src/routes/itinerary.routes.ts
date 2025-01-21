import { Router } from "express";
import {
    generateItinerary,
    likeItinerary,
    editItinerary,
} from "@/controllers/itinerary.controller";
import addUser from "@/middlewares/addUser.middleware";

const itineraryRouter = Router();

itineraryRouter.post("/generate", addUser, generateItinerary);
itineraryRouter.post("/:id/like", likeItinerary);
itineraryRouter.put("/:id", addUser, editItinerary);

export default itineraryRouter;
