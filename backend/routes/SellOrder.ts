import express from "express";
import sellOrderControllers from "../controllers/sellOrderControllers/sellOrderControllers";

const router = express.Router();

router.get("/getSellOrders", sellOrderControllers.getSellOrders);

router.post("/createSellOrder", sellOrderControllers.createSellOrder);

//router.delete("/deleteSellOrder", itemCategoryControllers.deleteItemCategory);

export default router;
