import express from 'express';
import validator from './../middleware/validator.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv/config.js';
import jwt from 'jsonwebtoken';
import { prisma } from './../util/prisma.js';
import { customErrorCodes } from './../util/definition.js';

const authRouter = express.Router();

const JWT_KEY = process.env.JWT_KEY;

authRouter.post('/signup', validator('signUp'), async (req, res, next) => {
    const { nickname, password } = req.body;
    const user = await prisma.user.findUnique({ where: { nickname } });
    // 해당 닉네임으로 이미 가입한 회원이 있는 경우
    if (user) {
        next({ code: customErrorCodes['1_Duplicate_Nickname'] });
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { nickname, password: hashedPassword } });
    return res.status(200).json({ message: '회원 가입이 완료되었습니다.' });
});

authRouter.post('/login', validator('login'), async (req, res, next) => {
    const { nickname, password } = req.body;
    const user = await prisma.user.findUnique({ where: { nickname } });

    // 입력한 닉네임을 가진 회원이 없는 경우
    if (!user) {
        next({ code: customErrorCodes['2_No_Exist_Nickname'] });
        return;
    }

    const isMatched = await bcrypt.compare(password, user.password);

    // 비밀번호가 틀린 경우
    if (!isMatched) {
        next({ code: customErrorCodes['3_No_Match_Password'] });
        return;
    }

    const userJWT = jwt.sign({ userId: user.userId }, JWT_KEY, { expiresIn: '1h' });
    res.cookie('authorization', `Bearer ${userJWT}`);
    return res.status(200).json({ token: userJWT });
})

export default authRouter;