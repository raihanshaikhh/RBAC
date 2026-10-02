import express from "express";

import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();


// GET all projects
// Admin + Member
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  getProjects
);


// GET single project
// Admin + Member
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin", "Member"]),
  getProject
);


// CREATE project
// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["Admin"]),
  createProject
);


// UPDATE project
// Admin only
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  updateProject
);


// DELETE project
// Admin only
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["Admin"]),
  deleteProject
);


export default router;