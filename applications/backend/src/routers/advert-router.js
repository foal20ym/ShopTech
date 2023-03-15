import express from "express";
import * as advertController from "../controllers/advert-controller.js"
const router = express.Router();

router.get("/test/:id", advertController.getUserAdverts);
router.get("/", advertController.getAdverts);
router.get("/advert/:id", advertController.getAdvertById);
router.post("/createad", advertController.createAdvert);
router.patch("/update/:id", advertController.updateAdvertById);
router.delete("/delete/:id", advertController.deleteAdvertById);

export default router;
