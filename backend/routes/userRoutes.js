import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUserProfile,
  loginUser,
  logoutUser,
  updateUserById,
  updateUserProfile,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User Routes
router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);

// Admin Routes
router.route("/").get(authenticate, authorizeAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
