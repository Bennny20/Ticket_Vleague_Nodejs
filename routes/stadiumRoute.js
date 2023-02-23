import express from "express";
import { createStadium } from "../Controller/stadiumCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createStadium);

export default router;