import express from "express";
import itemControllers from "../controllers/itemControllers/itemControllers";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

const router = express.Router();

router.get("/getItems", authenticateToken, itemControllers.getItems);

router.post("/createItem", authenticateToken, itemControllers.createItem);

router.delete("/deleteItem", authenticateToken, itemControllers.deleteItem);

export default router;
