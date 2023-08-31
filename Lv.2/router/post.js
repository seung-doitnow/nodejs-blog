import express from 'express';
import { prisma } from '../util/prisma.js';
import { DataValidator } from '../util/validator.js';

const postRouter = express.Router();

// 전체 게시글 목록 조회 API
postRouter.get('/', async (req, res, next) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            postId: true,
            user: true,
            title: true,
            createdAt: true,
        }
    });

    return res.status(200).json(posts);
});

// 게시글 작성 API
postRouter.post('/', async (req, res, next) => {
    const { user, title, content, password } = DataValidator.WritePostData(req.body).value;
    if (!user) {
        return res.status(400).json({ message: "작성자를 입력해주세요." });
    } else if (!title) {
        return res.status(400).json({ message: "제목을 입력해주세요." });
    } else if (!content) {
        return res.status(400).json({ message: "내용을 입력해주세요." });
    } else if (!password) {
        return res.status(400).json({ message: "비밀번호를 입력해주세요." });
    }

    await prisma.post.create({ data: { user, title, content, password } });

    return res.status(200).json({ message: '게시글 작성이 완료되었습니다.' });
});

// 게시글 상세 조회 API
postRouter.get('/:postId', async (req, res, next) => {
    const postId = DataValidator.PostId(req.params).value.postId;
    if (!postId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }

    const post = await prisma.post.findUnique({
        where: { postId: +postId },
        select: {
            postId: true,
            user: true,
            title: true,
            content: true,
            createdAt: true,
        }
    });
    if (!post) {
        return res.status(404).json({ message: "없는 게시글입니다. 게시글 번호를 다시 확인해주세요." });
    }

    return res.status(200).json(post);
});

// 게시글 수정 API
postRouter.put('/:postId', async (req, res, next) => {
    const postId = DataValidator.PostId(req.params).value.postId;
    if (!postId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }

    const { title, content, password } = DataValidator.UpdatePostData(req.body).value;
    if (!title) {
        return res.status(400).json({ message: '제목을 입력해주세요.' });
    } else if (!content) {
        return res.status(400).json({ message: '내용을 입력해주세요.' });
    } else if (!password) {
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
    }

    const post = await prisma.post.findUnique({ where: { postId: +postId } });
    if (!post) {
        return res.status(404).json({ message: "없는 게시글입니다. 게시글 번호를 다시 확인해주세요." });
    } else if (password !== post.password) {
        return res.status(404).json({ message: "비밀번호가 틀립니다." });
    }

    await prisma.post.update({
        data: { title, content },
        where: { postId: +postId, password }
    });

    return res.status(200).json({ message: '게시물 수정이 완료되었습니다.' });
})

// 게시글 삭제 API
postRouter.delete('/:postId', async (req, res, next) => {
    const postId = DataValidator.PostId(req.params).value.postId;
    if (!postId) {
        return res.status(400).json({ message: "게시글 번호를 입력해주세요." });
    }

    const password = DataValidator.Password(req.body).value.password;
    if (!password) {
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
    }

    const post = await prisma.post.findUnique({ where: { postId: +postId } });
    if (!post) {
        return res.status(404).json({ message: "없는 게시글입니다. 게시글 번호를 다시 확인해주세요." });
    } else if (password !== post.password) {
        return res.status(404).json({ message: "비밀번호가 틀립니다." });
    }

    await prisma.post.delete({ where: { postId: +postId } });

    return res.status(200).json({ message: '게시물 삭제가 완료되었습니다.' });
})

export default postRouter;