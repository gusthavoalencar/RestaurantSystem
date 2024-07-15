import express from "express";
import itemMenuSectionControllers from "../controllers/itemControllers/itemMenuSectionController";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

const router = express.Router();

router.get("/getItemMenuSections", authenticateToken, itemMenuSectionControllers.getItemMenuSections);

router.post("/createItemMenuSection", authenticateToken, itemMenuSectionControllers.createItemMenuSection);

router.delete("/deleteItemMenuSection", authenticateToken, itemMenuSectionControllers.deleteItemMenuSection);

export default router;
