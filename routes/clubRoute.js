import express from "express";
import {
  createClub,
  deleteClub,
  updateClub,
  getAllClub,
  getClub,
} from "../Controller/clubCon.js";
import upload from "../middlewate/upload.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, upload.single("logo"), createClub);
router.put("/:id", vertifyAdmin,upload.single("logo"), updateClub);
router.delete("/:id", vertifyAdmin, deleteClub);
router.get("/:id", getClub);
router.get("/", getAllClub);

export default router;
