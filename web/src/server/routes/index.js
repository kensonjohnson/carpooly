import { Router } from "express";
const router = Router();
import { dirname } from "path";
import { fileURLToPath } from "url";
import { ensureAuthenticated } from "../config/auth.js";

// Welcome Page

// Dashboard
// router.get("/dashboard", ensureAuthenticated, (req, res) => {
//   res.render("dashboard", {
//     name: req.user.name,
//   });
// });

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.sendFile("dashboard.html", { root: "public" });
});

export default router;
