import express from "express";
import * as authController from "../controllers/auth-controller.js"
const router = express.Router();

//router.get("/", authController.getAdverts);
//router.get("/advert/:id", authController.getAdvertById);

router.post("/tokens", authController.signIn);
router.post("/signup", authController.signUp);
router.post("/registerFromAuth", authController.registerGoogleAuthUser);
router.get("/account/:id", authController.getUserByEmail);
router.get("/advertCreatorEmail/:id", authController.getUserByAdvertId);
router.patch("/account/update/:id", authController.updateAccountByEmail);
router.delete("/account/delete/:id", authController.deleteAccountByEmail);

export default router;