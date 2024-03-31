import express from "express";
import itemControllers from "../controllers/itemControllers/itemControllers";

const router = express.Router();

router.get("/getHelloWorld", itemControllers.getHelloWorld);
router.get("/getItems", itemControllers.getItems);

export default router;
