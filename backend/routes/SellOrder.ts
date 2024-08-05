import express from "express";
import sellOrderControllers from "../controllers/sellOrderControllers/sellOrderControllers";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

//Create a router
const router = express.Router();

//Routes
router.get("/getSellOrders", authenticateToken, sellOrderControllers.getSellOrders);
router.get("/getSellOrderById", authenticateToken, sellOrderControllers.getSellOrderById);
router.post("/createSellOrder", authenticateToken, sellOrderControllers.createSellOrder);
router.post("/editSellOrder", authenticateToken, sellOrderControllers.editSellOrder);
router.post("/deleteSellOrder", sellOrderControllers.deleteSellOrder);

export default router;
