import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv/config.js';

import userRouter from './routes/user.js';
import postRouter from './routes/post.js';
import commentRouter from './routes/comment.js';
import errorHandler from './middlewares/errorHandler.js';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(userRouter);
app.use('/posts', postRouter);
app.use('/posts/:postId/comments', commentRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`${PORT} 서버가 열렸습니다.`);
})