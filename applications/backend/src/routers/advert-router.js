import express from "express";
import * as advertController from "../controllers/advert-controller.js";
const router = express.Router();
import * as path from "path";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", advertController.getAdverts);
router.get("/:id", advertController.getAdvertById);
router.get("/getUserAdverts/:id", advertController.getUserAdverts);
router.post("/", advertController.createAdvert);
router.patch("/:id", advertController.updateAdvertById);
router.patch("/upload/:id", upload.single("image"), advertController.insertImageIntoAdvertById);
router.delete("/:id", advertController.deleteAdvertById);

export default router;
