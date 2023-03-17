import express from "express";
import * as reviewController from "../controllers/review-controller.js";
const router = express.Router();


router.get("/", reviewController.getReviews);
router.get("/:id", reviewController.getReviewById);
router.post("/create", reviewController.createReview)
router.delete("/delete/:id", reviewController.deleteReviewById);
router.patch("/update/:id", reviewController.updateReviewById);


export default router;
