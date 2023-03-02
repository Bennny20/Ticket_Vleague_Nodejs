import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrder, getOrder, getById, deleteOrder } from "../Controller/orderCon.js";

const router = express.Router();

router.post("/", vertifyAdmin, createOrder);
router.get("/", getOrder);
router.get("/:id", getById);
router.delete("/:id", vertifyAdmin, deleteOrder);

export default router;
