import express from "express";
import { createClub, getClub } from "../Controller/clubCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createClub);
router.get("/:id", getClub);

export default router;