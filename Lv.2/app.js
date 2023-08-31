import express from 'express';
import postRouter from './router/post.js';
import commentRouter from './router/comment.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/posts/:postId/comments', commentRouter);

app.listen(3306, () => {
    console.log('서버 오픈 완료!');
})
