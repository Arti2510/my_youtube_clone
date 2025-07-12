import { register, login, logout , getUserProfile } from '../Controllers/authController.js';
import express from 'express';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Profile route
router.get("/:id", getUserProfile);


export default router;