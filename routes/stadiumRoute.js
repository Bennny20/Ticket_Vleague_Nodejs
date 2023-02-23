import express from "express";
import {
  createStadium,
  deleteStadium,
  getAllStadium,
  getStadium,
  updateStadium,
} from "../Controller/stadiumCon.js";
import { vertifyAdmin } from "./../utils/vertifyToken.js";

const router = express.Router();

router.post("/", vertifyAdmin, createStadium);
router.put("/:id", vertifyAdmin, updateStadium);
router.delete("/:id", vertifyAdmin, deleteStadium);
router.get("/:id", vertifyAdmin, getStadium);
router.get("/", vertifyAdmin, getAllStadium);

export default router;
