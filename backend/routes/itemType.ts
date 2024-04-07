import express from "express";
import itemTypeControllers from "../controllers/itemControllers/itemTypeController";

const router = express.Router();

router.get("/getItemTypes", itemTypeControllers.getItemTypes);

router.post("/createItemType", itemTypeControllers.createItemType);

router.delete("/deleteItemType", itemTypeControllers.deleteItemType);

export default router;
