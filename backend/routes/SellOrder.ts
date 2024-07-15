import express from "express";
import sellOrderControllers from "../controllers/sellOrderControllers/sellOrderControllers";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

const router = express.Router();

router.get("/getSellOrders", authenticateToken, sellOrderControllers.getSellOrders);

router.post("/createSellOrder", authenticateToken, sellOrderControllers.createSellOrder);

//router.delete("/deleteSellOrder", itemCategoryControllers.deleteItemCategory);

export default router;
