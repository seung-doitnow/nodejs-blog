import express from "express";
import Comment from "./../schemas/comment.js";
import joi from "joi";

const commentRouter = express.Router();

// 댓글 목록 조회 API
commentRouter.get("/", async (req, res, next) => {
    if (!req.data) {
        return res.status(400).json({ message: "postId를 다시 입력해주세요." });
    }

    const comments = await Comment.find({ targetPost: req.data }).sort("-date").exec();
    if (!comments) {
        return res.status(404).json({ message: "댓글이 존재하지 않습니다." });
    }

    return res.status(200).json({ comments });
});

const checkCommentData = joi.object({
    content: joi.required(),
})

// 댓글 작성 API
commentRouter.post("/", async (req, res, next) => {
    if (!req.data) {
        return res.status(400).json({ message: "postId를 다시 입력해주세요." });
    }

    const validation = await checkCommentData.validateAsync(req.body);
    const { content } = validation;
    if (!content) {
        return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
    }
    const date = new Date();
    const comment = new Comment({ targetPost: req.data, content, date });

    await comment.save();

    return res.status(200).json({ message: "댓글 작성이 완료되었습니다." });
});

// 댓글 수정 API
commentRouter.patch("/:commentId", async (req, res, next) => {
    if (!req.params) {
        return res.status(400).json({ message: "commentId를 다시 입력해주세요." });
    }

    const targetComment = await Comment.findById({ _id: req.params.commentId }).exec();
    if (!targetComment) {
        return res.status(404).json({ message: "없는 댓글입니다. commentId를 다시 확인해주세요." });
    }

    const { content } = req.body;

    await Comment.updateOne({ _id: req.params.commentId }, { content });

    return res.status(200).json({ message: "댓글 수정이 완료되었습니다." });
});

// 댓글 삭제 API
commentRouter.delete("/:commentId", async (req, res, next) => {
    if (!req.params) {
        return res.status(400).json({ message: "commentId를 다시 입력해주세요." });
    }

    const targetComment = await Comment.findById({ _id: req.params.commentId }).exec();
    if (!targetComment) {
        return res.status(404).json({ message: "없는 댓글입니다. commentId를 다시 확인해주세요." });
    }

    await Comment.deleteOne({ _id: req.params.commentId });

    return res.status(200).json({ message: "댓글 삭제가 완료되었습니다." });
})

export default commentRouter;