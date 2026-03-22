import express from "express";
import { authMiddleware } from "../../../StoryRead/backend/middlewares/authMiddleware.js";
import { getProfileMe, Login, Logout, RefreshToken, Register } from "../controllers/auth.controller.js";
const router = express.Router();

router.get('/me', authMiddleware, getProfileMe);
router.post('/register', Register);
router.post('/login', Login);
router.post('/logout', Logout);
router.post('/refreshtoken', RefreshToken);

export default router;