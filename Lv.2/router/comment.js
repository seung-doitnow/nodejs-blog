import express from 'express';
import { prisma } from '../util/prisma.js';
import { DataValidator } from '../util/validator.js';

const commentRouter = express.Router({ mergeParams: true });

// 특정 게시글의 댓글 목록 조회 API
commentRouter.get('/', async (req, res, next) => {
    const PostId = DataValidator.PostId(req.params).value.postId;
    if (!PostId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }

    const comments = await prisma.comment.findMany({
        where: {
            PostId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            commentId: true,
            user: true,
            content: true,
            createdAt: true,
        }
    });

    return res.status(200).json(comments);
});

// 댓글 작성 API
commentRouter.post('/', async (req, res, next) => {
    const PostId = DataValidator.PostId(req.params).value.postId;
    if (!PostId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }

    const { user, content, password } = DataValidator.WriteCommentData(req.body).value;
    if (!user) {
        return res.status(400).json({ message: "작성자를 입력해주세요." });
    } else if (!content) {
        return res.status(400).json({ message: "내용을 입력해주세요." });
    } else if (!password) {
        return res.status(400).json({ message: "비밀번호를 입력해주세요." });
    }

    await prisma.comment.create({ data: { user, content, password, PostId } });

    return res.status(200).json({ message: '댓글 작성이 완료되었습니다.' });
});

// 댓글 수정 API
commentRouter.put('/:commentId', async (req, res, next) => {
    const PostId = DataValidator.PostId(req.params).value.postId;
    if (!PostId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }
    const commentId = DataValidator.CommentId(req.params).value.commentId;
    if (!commentId) {
        return res.status(400).json({ message: "댓글 번호를 입력해주세요." });
    }

    const { content, password } = DataValidator.UpdateCommentData(req.body).value;
    if (!content) {
        return res.status(400).json({ message: '내용을 입력해주세요.' });
    } else if (!password) {
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
    }

    const comment = await prisma.comment.findUnique({ where: { commentId: +commentId } });
    if (!comment) {
        return res.status(404).json({ message: "없는 댓글입니다. 댓글 번호를 다시 확인해주세요." });
    } else if (password !== comment.password) {
        return res.status(404).json({ message: "비밀번호가 틀립니다." });
    }

    await prisma.comment.update({
        data: { content },
        where: { commentId: +commentId, password }
    });

    return res.status(200).json({ message: '댓글 수정이 완료되었습니다.' });
})

// 댓글 삭제 API
commentRouter.delete('/:commentId', async (req, res, next) => {
    const PostId = DataValidator.PostId(req.params).value.postId;
    if (!PostId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }
    const commentId = DataValidator.CommentId(req.params).value.commentId;
    if (!commentId) {
        return res.status(400).json({ message: "댓글 번호를 입력해주세요." });
    }

    const password = DataValidator.Password(req.body).value.password;
    if (!password) {
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
    }

    const comment = await prisma.comment.findUnique({ where: { commentId: +commentId } });
    if (!comment) {
        return res.status(404).json({ message: "없는 댓글입니다. 댓글 번호를 다시 확인해주세요." });
    } else if (password !== comment.password) {
        return res.status(404).json({ message: "비밀번호가 틀립니다." });
    }

    await prisma.comment.delete({ where: { commentId: +commentId, password } });

    return res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });
})

export default commentRouter;