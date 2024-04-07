import express from "express";
import itemCategoryControllers from "../controllers/itemControllers/itemCategoryController";

const router = express.Router();

router.get("/getItemCategories", itemCategoryControllers.getItemCategories);

router.post("/createItemCategory", itemCategoryControllers.createItemCategory);

router.delete("/deleteItemCategory", itemCategoryControllers.deleteItemCategory);

export default router;
