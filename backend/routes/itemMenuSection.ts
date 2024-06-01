import express from "express";
import itemMenuSectionControllers from "../controllers/itemControllers/itemMenuSectionController";

const router = express.Router();

router.get("/getItemMenuSections", itemMenuSectionControllers.getItemMenuSections);

router.post("/createItemMenuSection", itemMenuSectionControllers.createItemMenuSection);

router.delete("/deleteItemMenuSection", itemMenuSectionControllers.deleteItemMenuSection);

export default router;
