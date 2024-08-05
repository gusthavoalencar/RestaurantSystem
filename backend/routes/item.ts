import express from "express";
import itemControllers from "../controllers/itemControllers/itemControllers";
import { authenticateToken } from "../controllers/userControllers/userControllers.utils";

//Create a router
const router = express.Router();

//Routes
router.get("/getItems", authenticateToken, itemControllers.getItems);
router.post("/createItem", authenticateToken, itemControllers.createItem);
router.post("/editItem", authenticateToken, itemControllers.editItem);
router.post("/deleteItem", authenticateToken, itemControllers.deleteItem);

export default router;
