import express from "express";
import { createMatch, getMatchByRound } from "../Controller/MatchCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createMatch);
router.get("/:id", getMatchByRound);

export default router;