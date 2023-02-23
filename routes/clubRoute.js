import express from "express";
import {
  createClub,
  deleteClub,
  updateClub,
  getAllClub,
  getClub,
} from "../Controller/clubCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createClub);
router.put("/:id", vertifyAdmin, updateClub);
router.delete("/:id", vertifyAdmin, deleteClub);
router.get("/:id", getClub);
router.get("/", getAllClub);

export default router;
