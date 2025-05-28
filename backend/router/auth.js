import express from "express";
import { adminLogin, adminLogout } from "../controller/auth.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

export default router;
