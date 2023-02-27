import express from "express";
import { vertifyAdmin } from "./../utils/vertifyToken.js";
import {
  createStand,
  getByStadium,
  getStand,
} from "./../Controller/standCon.js";

const router = express.Router();

router.post("/:stadiumId", vertifyAdmin, createStand);
router.get("/stadium/:stadiumId", getByStadium);
router.get("/:id", getStand);

export default router;
