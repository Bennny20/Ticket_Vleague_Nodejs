import express from "express";
import {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  updateUserRole,
} from "../Controller/UserCon.js";
import {
  vertifyToken,
  vertifyAdmin,
  vertifyUser,
} from "../utils/vertifyToken.js";

const router = express.Router();

//Update
router.put("/:id", vertifyUser, updateUser);
router.put("/:id", vertifyUser, updateUserRole);
//Delete
router.delete("/:id", vertifyAdmin, deleteUser);
//Get
router.get("/:id", vertifyUser, getUser);
router.get("/", getUsers);
export default router;
