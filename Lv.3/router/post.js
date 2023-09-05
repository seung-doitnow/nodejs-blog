import express from 'express';
import validator from './../middleware/validator.js';
import authorizator from './../middleware/authorizator.js';
import { prisma } from '../util/prisma.js';
import { customErrorCodes } from './../util/definition.js';
import selector from './../util/selector.js';

const postRouter = express.Router();

// 전체 게시글 목록 조회 API
postRouter.get('/', async (req, res, next) => {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' }, select: selector.viewPostList });

    return res.status(200).json({ posts: posts });
});

// 게시글 작성 API
postRouter.post('/', validator('createPost'), authorizator, async (req, res, next) => {
    const { userId, nickname } = req.body.user;
    const { title, content } = req.body;

    await prisma.post.create({ data: { userId, nickname, title, content } });

    return res.status(200).json({ message: '게시글 작성이 완료되었습니다.' });
});

// 게시글 상세 조회 API
postRouter.get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const post = await prisma.post.findUnique({ where: { postId }, select: selector.viewPost });
    // 게시글이 존재하지 않는 경우
    if (!post) {
        next({ code: customErrorCodes['5_No_Exist_Post'] });
        return;
    }

    return res.status(200).json({ post });
});

// 게시글 수정 API
postRouter.put('/:postId', validator('updatePost'), authorizator, async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const { userId } = req.body.user;
    const { title, content } = req.body;

    const post = await prisma.post.findUnique({ where: { postId } });
    // 게시글이 존재하지 않는 경우, 작성자가 아닌 경우
    if (!post) {
        next({ code: customErrorCodes['5_No_Exist_Post'] });
        return;
    } else if (post.userId !== userId) {
        next({ code: customErrorCodes['6_No_Permission_Update'] });
        return;
    }

    await prisma.post.update({ data: { title, content, updatedAt: new Date() }, where: { postId } });

    return res.status(200).json({ message: '게시물 수정이 완료되었습니다.' });
})

// 게시글 삭제 API
postRouter.delete('/:postId', authorizator, async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const { userId } = req.body.user;

    const post = await prisma.post.findUnique({ where: { postId } });
    // 게시글이 존재하지 않는 경우, 작성자가 아닌 경우
    if (!post) {
        next({ code: customErrorCodes['5_No_Exist_Post'] });
        return;
    } else if (post.userId !== userId) {
        next({ code: customErrorCodes['7_No_Permission_Delete'] });
        return;
    }

    await prisma.post.delete({ where: { postId } });

    return res.status(200).json({ message: '게시물 삭제가 완료되었습니다.' });
})

export default postRouter;