import express from "express";
import itemControllers from "../controllers/itemControllers/itemControllers";

const router = express.Router();

router.get("/getItems", itemControllers.getItems);

router.post("/createItem", itemControllers.createItem);

router.delete("/deleteItem", itemControllers.deleteItem);

export default router;
