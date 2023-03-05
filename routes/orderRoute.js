import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrder, getOrder, getById, deleteOrder } from "../Controller/orderCon.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrder);
router.get("/:id", getById);
router.delete("/:id", deleteOrder);

export default router;
