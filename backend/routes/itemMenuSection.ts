import express from "express";
import itemMenuSectionControllers from "../controllers/itemControllers/itemMenuSectionController";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

//Create a router
const router = express.Router();

//Routes
router.get("/getItemMenuSections", authenticateToken, itemMenuSectionControllers.getItemMenuSections);
router.post("/createItemMenuSection", authenticateToken, itemMenuSectionControllers.createItemMenuSection);
router.delete("/deleteItemMenuSection", authenticateToken, itemMenuSectionControllers.deleteItemMenuSection);

export default router;
