import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();
// create user 
router.post("/register", registerUser)
// login user 
router.post("/login", loginUser)


export { router as userRoutes};