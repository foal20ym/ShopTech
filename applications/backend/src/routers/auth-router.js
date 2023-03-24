import express from "express";
import * as authController from "../controllers/auth-controller.js"
const router = express.Router();

router.post("/tokens", authController.signIn);
router.post("/signup", authController.signUp);
router.post("/registerFromAuth", authController.registerGoogleAuthUser);
router.get("/:id", authController.getUserByEmail);
router.get("/advertCreatorEmail/:id", authController.getUserByAdvertId);
router.patch("/:id", authController.updateAccountByEmail);
router.delete("/:id", authController.deleteAccountByEmail);

export default router;