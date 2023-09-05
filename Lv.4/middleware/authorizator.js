import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config.js';
import { prisma } from '../util/prisma.js';
import { customErrorCodes } from './../util/definition.js';

const JWT_KEY = process.env.JWT_KEY;

export default async function (req, res, next) {
    try {
        const { authorization } = req.cookies;
        // 쿠키가 존재하지 않는 경우 (로그인이 필요한 경우)
        if (!authorization) {
            next({ code: customErrorCodes['11_No_Cookie'] });
            return;
        }

        const [tokenType, token] = authorization.split(' ');
        const decodedToken = jwt.verify(token, JWT_KEY);

        req.body.user = await prisma.user.findUnique({ where: { userId: decodedToken.userId } });

        next();
    } catch (error) {
        switch (error.name) {
            case 'TokenExpiredError':
                next({ code: customErrorCodes['12_Expired_Token'] });
                break;
            case 'JsonWebTokenError':
                next({ code: customErrorCodes['13_No_Match_Token'] });
                break;
        }
    }
};