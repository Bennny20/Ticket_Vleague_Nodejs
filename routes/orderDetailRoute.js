import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrderDetail } from "../Controller/orderDetailCon.js";

const router = express.Router();

router.post("/", vertifyAdmin, createOrderDetail);

export default router;
