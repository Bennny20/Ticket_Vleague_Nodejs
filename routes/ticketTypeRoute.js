import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import {
  createTicketType,
  deleteTicketType,
  updateTicketType,
} from "./../Controller/ticketTypeCon.js";

const router = express.Router();

router.post("/:matchId", vertifyAdmin, createTicketType);
router.put("/:matchId/:id", vertifyAdmin, updateTicketType);
router.delete("/:matchId/:id", vertifyAdmin, deleteTicketType);
router.get("/:matchId", updateTicketType);
router.get("/:matchId/:id", updateTicketType);

export default router;
