import { Router } from "express";
const router = Router();

// Welcome Page
router.get("/", (req, res) => {
  res.render("index");
});

export default router;

// fix footer
