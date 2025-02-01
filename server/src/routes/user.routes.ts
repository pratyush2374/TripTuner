import {
    sendCode,
    signUp,
    signIn,
    refreshBothTokens,
    signOut,
    sendLinkForForgotPassword,
    resetPassword,
    verifyCode,
    getItineraries,
} from "@/controllers/user.controller";
import verifyJwt from "@/middlewares/verifyJwt.middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/send-code", sendCode);
userRouter.post("/verify-code", verifyCode);
userRouter.post("/sign-up", signUp);
userRouter.post("/sign-in", signIn);
userRouter.get("/refresh-tokens", verifyJwt, refreshBothTokens);
userRouter.get("/sign-out", verifyJwt, signOut);
userRouter.post("/send-forgot-password-link", sendLinkForForgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter.get("/my-itineraries", verifyJwt, getItineraries);

export default userRouter;
