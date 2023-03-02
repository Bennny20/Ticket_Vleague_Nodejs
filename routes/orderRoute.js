import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createOrder, getOrder, getById } from "../Controller/orderCon.js";

const router = express.Router();

router.post("/", vertifyAdmin, createOrder);
router.get("/", getOrder);
router.get("/:id", getById);

export default router;
