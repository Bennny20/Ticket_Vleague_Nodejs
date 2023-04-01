import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrder, getOrder, getById, deleteOrder, getByUser, totalPrice } from "../Controller/orderCon.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrder);
router.get("/total", totalPrice);
router.get("/:id", getById);
router.get("/user/:id", getByUser);
router.delete("/:id", deleteOrder);

export default router;
