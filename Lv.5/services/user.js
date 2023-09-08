import { customErrorCodes } from './../utils/definition.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const JWT_KEY = process.env.JWT_KEY;

export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    createUser = async (nickname, password) => {
        const user = await this.userRepository.getUser(nickname);
        // 이미 해당 닉네임으로 가입한 회원이 있는 경우
        if (user) {

        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userRepository.insertUser(nickname, hashedPassword);
    }

    getAuthority = async (nickname, password) => {
        const user = await this.userRepository.getUser(nickname);
        // 입력한 닉네임을 가진 회원이 없는 경우
        if (!user) {

        }

        const isMatched = await bcrypt.compare(password, user.password);
        // 입력한 비밀번호가 유저의 비밀번호 정보와 틀린 경우
        if (!isMatched) {

        }

        const userJWT = jwt.sign({ userId: user.userId }, JWT_KEY, { expiresIn: '1h' });
        return userJWT;
    }
}