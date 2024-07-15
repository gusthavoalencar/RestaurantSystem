import express from "express";
import userControllers from "../controllers/userControllers/userControllers";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

const router = express.Router();

router.post("/forgotpassword", userControllers.forgotpassword);
router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.post("/resetpassword", userControllers.resetpassword);
router.get("/getUser", authenticateToken, userControllers.getUser);
router.get("/getUsers", authenticateToken, userControllers.getUsers);
router.delete("/deleteUser", authenticateToken);

export default router;
