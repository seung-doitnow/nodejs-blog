import { customErrorCodes } from './../utils/definition.js';

export class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }

    getAllComments = async (postId) => {
        const comments = await this.commentRepository.selectAllComments(postId);
        comments.sort((lhs, rhs) => rhs.createdAt - lhs.createdAt);

        return comments.map((comment) => {
            return {
                commentId: comment.commentId,
                userId: comment.userId,
                nickname: comment.nickname,
                content: comment.content,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            }
        })
    }

    createComment = async (userId, nickname, postId, content) => {
        await this.commentRepository.insertComment(userId, nickname, postId, content);
    }

    updateComment = async (commentId, userId, content) => {
        const comment = await this.commentRepository.selectOneComment(commentId);
        // 입력받은 댓글 Id를 가진 댓글이 존재하지 않는 경우
        if (!comment) {

        }

        // 해당 댓글의 작성자가 아닌 경우
        if (comment.userId !== userId) {

        }

        await this.commentRepository.updateComment(commentId, content);
    }

    deleteComment = async (commentId, userId) => {
        const comment = await this.commentRepository.selectOneComment(commentId);
        // 입력받은 댓글 Id를 가진 댓글이 존재하지 않는 경우
        if (!comment) {

        }

        // 해당 댓글의 작성자가 아닌 경우
        if (comment.userId !== userId) {

        }

        await this.commentRepository.deleteComment(commentId);
    }
}