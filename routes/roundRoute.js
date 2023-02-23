import express from "express";
import { createRound, deleteRound, getRoundByTournament } from "../Controller/roundCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createRound);
router.delete("/:id", vertifyAdmin, deleteRound);
router.get("/:id", getRoundByTournament);

export default router;
