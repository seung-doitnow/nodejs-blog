import express from "express";
import Post from "./../schemas/post.js";
import joi from "joi";

const postRouter = express.Router();

// 전체 게시글 목록 조회 API
postRouter.get("/", async (req, res, next) => {
    const projection = {
        _id: 0,
        title: 1,
        writer: 1,
        date: 1,
    }
    const posts = await Post.find({}, projection).sort("-date").exec();

    return res.status(200).json({ posts });
});

const checkPostData = joi.object({
    title: joi.required(),
    writer: joi.required(),
    content: joi.required(),
    password: joi.required(),
})

// 게시글 작성 API
postRouter.post("/", async (req, res, next) => {
    const validation = await checkPostData.validateAsync(req.body);
    const { title, writer, content, password } = validation;
    if (!title) {
        return res.status(400).json({ message: "게시글 제목을 입력해주세요." });
    } else if (!writer) {
        return res.status(400).json({ message: "게시글 작성자를 입력해주세요." });
    } else if (!content) {
        return res.status(400).json({ message: "게시글 내용을 입력해주세요." });
    } else if (!password) {
        return res.status(400).json({ message: "게시글 비밀번호를 입력해주세요." });
    }
    const date = new Date();
    const post = new Post({ title, writer, date, content, password });

    await post.save();

    return res.status(200).json({ message: "게시글 작성이 완료되었습니다." });
});

// 게시글 상세 조회 API
postRouter.get("/:postId", async (req, res, next) => {
    if (!req.params) {
        return res.status(400).json({ message: "postId를 다시 입력해주세요." });
    }

    const projection = {
        _id: 0,
        title: 1,
        writer: 1,
        date: 1,
        content: 1,
    }

    const post = await Post.findById({ _id: req.params.postId }, projection).exec();
    if (!post) {
        return res.status(404).json({ message: "없는 게시글입니다. postId를 다시 확인해주세요." });
    }

    return res.status(200).json({ post });
});

// 게시글 수정 API
postRouter.patch("/:postId", async (req, res, next) => {
    if (!req.params) {
        return res.status(400).json({ message: "postId를 다시 입력해주세요." });
    }

    const targetPost = await Post.findById({ _id: req.params.postId }).exec();
    if (!targetPost) {
        return res.status(404).json({ message: "없는 게시글입니다. postId를 다시 확인해주세요." });
    }

    const { title, content, password } = req.body;
    if (Number(password) !== targetPost.password) {
        return res.status(401).json({ message: "비밀번호가 틀립니다. 다시 확인해주세요." });
    }

    await Post.updateOne({ _id: req.params.postId }, { title, content, password });

    return res.status(200).json({ message: "게시글 수정이 완료되었습니다." });
});

// 게시글 삭제 API
postRouter.delete("/:postId", async (req, res, next) => {
    if (!req.params) {
        return res.status(400).json({ message: "postId를 다시 입력해주세요." });
    }

    const targetPost = await Post.findById({ _id: req.params.postId }).exec();
    if (!targetPost) {
        return res.status(404).json({ message: "없는 게시글입니다. postId를 다시 확인해주세요." });
    }

    const { password } = req.body;
    if (Number(password) !== targetPost.password) {
        return res.status(401).json({ message: "비밀번호가 틀립니다. 다시 확인해주세요." });
    }

    await Post.deleteOne({ _id: req.params.postId });

    return res.status(200).json({ message: "게시글 삭제가 완료되었습니다." });
});

export default postRouter;