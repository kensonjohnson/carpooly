import { Router } from "express";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";
import { createCarpool } from "../controllers/CarpoolController.js";

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/carpools/create", ensureAuthenticated, (req, res) => {
  res.render("createCarpools");
});

router.post("/carpools/create", ensureAuthenticated, createCarpool);

export default router;
