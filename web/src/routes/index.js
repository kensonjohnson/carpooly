import { Router } from "express";
import { appendFile } from "fs";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";

// Welcome Page
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard");
});

export default router;
