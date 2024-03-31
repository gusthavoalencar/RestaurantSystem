import express from "express";
import itemControllers from "../controllers/itemControllers/itemControllers";

const router = express.Router();

router.get('/getItems', itemControllers.getItems);

router.post('/createItem', itemControllers.getItems);

router.delete('/deleteItem/:id', itemControllers.getItems);

export default router;
