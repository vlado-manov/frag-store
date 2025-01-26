import express from "express";
import { googleSignIn } from "../controllers/googleAuthController";

const router = express.Router();

router.route("/google-sign-in").get(googleSignIn);

export default router;
