import express from "express";
import * as reviewController from "../controllers/review-controller.js";
const router = express.Router();

router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.createReview);
router.delete("/:id", reviewController.deleteReviewById);
router.put("/:id", reviewController.updateReviewById);

export default router;
