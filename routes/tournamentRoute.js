import express from "express";
import { createTournament, updateTournament } from "../Controller/tournamentCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createTournament);
router.put("/:id", vertifyAdmin, updateTournament);

export default router;
