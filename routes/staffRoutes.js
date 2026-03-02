// backend/routes/staffRoutes.js
import express from "express";
import { getMembersByRole } from "../controllers/staffController.js";

const router = express.Router();

// Route → /api/staff/get-members-by-role/:roleId
router.get("/get-members-by-role/:roleId", getMembersByRole);

export default router;