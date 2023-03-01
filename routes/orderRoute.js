import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrder } from "../Controller/orderCon.js";

const router = express.Router();

router.post("/", vertifyAdmin, createOrder);

export default router;
