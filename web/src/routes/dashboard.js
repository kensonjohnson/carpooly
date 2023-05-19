import { Router } from "express";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";
import { getDashboard } from "../controllers/DashboardController.js";
import {
  getCreateCarpoolPage,
  createCarpool,
  deleteCarpoolById,
} from "../controllers/CarpoolController.js";
import {
  getProfilePage,
  uploadProfilePicture,
} from "../controllers/ProfileController.js";

router.get("/", ensureAuthenticated, getDashboard);

router.get("/carpools/create", ensureAuthenticated, getCreateCarpoolPage);

router.post("/carpools/create", ensureAuthenticated, createCarpool);

router.post("/carpools/:id/delete", ensureAuthenticated, deleteCarpoolById);

// Route to edit profile page
router.get("/profile", ensureAuthenticated, getProfilePage);

// Route to upload profile pic
router.post(
  "/profile/upload-picture",
  ensureAuthenticated,
  uploadProfilePicture
);

export default router;
