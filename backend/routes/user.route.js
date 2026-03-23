import express from "express"
const router = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {roleMiddleware} from "../middlewares/role.middleware.js";
import { changePassword, deleteUser, getUserById, getUsers, updateRole, updateStatusUser, updateUser } from "../controllers/user.controller.js";

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getUserById);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

router.patch("/:id", authMiddleware, updateUser);

router.put("/change-password", authMiddleware, changePassword);

router.put("/:id/role", authMiddleware, roleMiddleware("admin"), updateRole);

router.put("/:id/status", authMiddleware, roleMiddleware("admin"), updateStatusUser);

export default router;