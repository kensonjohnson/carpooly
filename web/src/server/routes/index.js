import { Router } from "express";
import { appendFile } from "fs";
const router = Router();
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ensureAuthenticated } from "../config/auth.js";

// Welcome Page
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.sendFile("dashboard.html", { root: "public" });
});

export default router;
