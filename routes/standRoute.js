import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import {
  createStand,
  getByStadium,
  getStand,
  updateStand,
  deleteStand,
} from "./../Controller/standCon.js";

const router = express.Router();

router.post("/:stadiumId", vertifyAdmin, createStand);
router.put("/:id", vertifyAdmin, updateStand);
router.delete("/:id", vertifyAdmin, deleteStand);
router.get("/stadium/:stadiumId", getByStadium);
router.get("/:id", getStand);

export default router;
