import express from "express";
import { createRound, getRoundByTournament} from "../Controller/roundCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createRound);
router.get("/:id", getRoundByTournament);

export default router;
