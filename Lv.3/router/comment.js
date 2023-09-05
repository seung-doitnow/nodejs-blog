import express from 'express';
import validator from './../middleware/validator.js';
import authorizator from './../middleware/authorizator.js';
import { prisma } from '../util/prisma.js';
import { customErrorCodes } from './../util/definition.js';
import selector from './../util/selector.js';

const commentRouter = express.Router({ mergeParams: true });

// 특정 게시글의 댓글 목록 조회 API
commentRouter.get('/', async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const comments = await prisma.comment.findMany({ where: { postId }, orderBy: { createdAt: 'desc' }, select: selector.viewCommentList });

    return res.status(200).json({ comments });
});

// 댓글 작성 API
commentRouter.post('/', validator('createComment'), authorizator, async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const { userId, nickname } = req.body.user;
    const { content } = req.body;

    await prisma.comment.create({ data: { userId, nickname, postId, content } });

    return res.status(200).json({ message: '댓글 작성이 완료되었습니다.' });
});

// 댓글 수정 API
commentRouter.put('/:commentId', validator('updateComment'), authorizator, async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const commentId = req.params.commentId;
    // 댓글 id가 입력되지 않은 경우
    if (!commentId) {
        next({ code: customErrorCodes['8_No_Exist_CommentId'] });
        return;
    }

    const { userId } = req.body.user;
    const { content } = req.body;

    const comment = await prisma.comment.findUnique({ where: { commentId } });
    // 댓글이 존재하지 않는 경우, 작성자가 아닌 경우
    if (!comment) {
        next({ code: customErrorCodes['10_No_Exist_Comment'] });
        return;
    } else if (comment.userId !== userId) {
        next({ code: customErrorCodes['6_No_Permission_Update'] });
        return;
    }

    await prisma.comment.update({ data: { content, updatedAt: new Date() }, where: { commentId } });

    return res.status(200).json({ message: '댓글 수정이 완료되었습니다.' });
})

// 댓글 삭제 API
commentRouter.delete('/:commentId', authorizator, async (req, res, next) => {
    const postId = req.params.postId;
    // 게시글 id가 입력되지 않은 경우
    if (!postId) {
        next({ code: customErrorCodes['4_No_Exist_PostId'] });
        return;
    }

    const commentId = req.params.commentId;
    // 댓글 id가 입력되지 않은 경우
    if (!commentId) {
        next({ code: customErrorCodes['8_No_Exist_CommentId'] });
        return;
    }

    const { userId } = req.body.user;

    const comment = await prisma.comment.findUnique({ where: { commentId } });
    // 댓글이 존재하지 않는 경우, 작성자가 아닌 경우
    if (!comment) {
        next({ code: customErrorCodes['10_No_Exist_Comment'] });
        return;
    } else if (comment.userId !== userId) {
        next({ code: customErrorCodes['7_No_Permission_Delete'] });
        return;
    }

    await prisma.comment.delete({ where: { commentId } });

    return res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
})

export default commentRouter;