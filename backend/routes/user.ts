import express from "express";
import userControllers from "../controllers/userControllers/userControllers";

const router = express.Router();

router.post("/register", userControllers.register);
router.get("/getUser", userControllers.getUser);
router.get("/getUsers", userControllers.getUsers);
router.delete("/deleteUser");

export default router;
