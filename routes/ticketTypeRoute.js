import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import { createTicketType, updateTicketType } from "./../Controller/ticketTypeCon.js";

const router = express.Router();

router.post("/:matchId", vertifyAdmin, createTicketType);
router.put("/:matchId/:id", vertifyAdmin, updateTicketType);

export default router;
