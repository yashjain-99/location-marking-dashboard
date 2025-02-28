import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getLocations,
  addLocation,
} from "../controllers/locationsController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getLocations);

router.post("/", addLocation);

export default router;
