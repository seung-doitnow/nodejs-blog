import express from 'express';
import dotenv from 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import authRouter from './router/auth.js';
import postRouter from './router/post.js';
import commentRouter from './router/comment.js';
import errorRouter from './router/error.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRouter);
app.use('/posts', postRouter);
app.use('/posts/:postId/comments', commentRouter);
app.use(errorRouter);

app.listen(PORT, () => {
    console.log(`${PORT} 서버가 열렸습니다.`);
});