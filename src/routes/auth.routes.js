import { Router } from "express";
import { login, register, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', authRequired, profile)
router.post('/logout', logout)

export default router