import express from "express";
import * as faqController from "../controllers/faq-controller.js";
const router = express.Router();

router.get("/", faqController.getFAQ);
router.get("/:id", faqController.getFAQById);
router.post("/", faqController.createFAQ);
router.put("/:id", faqController.updateFAQById);
router.delete("/:id", faqController.deleteFAQById);

export default router;
