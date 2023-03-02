import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrderDetail, getById, getByOrder, getOrderDetail } from "../Controller/orderDetailCon.js";

const router = express.Router();

router.post("/", vertifyAdmin, createOrderDetail);
router.get("/order/:orderId", getByOrder);
router.get("/", getOrderDetail);
router.get("/:id", getById);

export default router;
