import express from 'express';
import { prisma } from '../utils/prisma.js';
import { UserRepository } from '../repositories/user.js';
import { UserService } from '../services/user.js';
import { UserController } from '../controllers/user.js';
import validator from '../middlewares/validator.js';

const router = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 회원 가입
router.post('/signup', validator('signUp'), userController.signUp);

// 로그인
router.post('/login', validator('login'), userController.signIn);

export default router;