export class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }

    // 특정 게시글의 댓글 목록 조회
    getAllComments = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const comments = await this.commentService.getAllComments(postId);

            return res.status(200).json({ comments });

        } catch (error) {
            console.log(error);
        }
    }

    // 댓글 작성
    createComment = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const { userId, nickname } = req.body.user;
            const { content } = req.body;

            await this.commentService.createComment(userId, nickname, postId, content);

            return res.status(201).json({ message: '댓글 작성이 완료되었습니다.' });

        } catch (error) {
            console.log(error);
        }
    }

    // 댓글 수정
    updateComment = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const commentId = req.params.commentId;
            // 댓글 Id를 입력하지 않은 경우
            if (!commentId) {

            }

            const { userId } = req.body.user;
            const { content } = req.body;

            await this.commentService.updateComment(commentId, userId, content);

            return res.status(200).json({ message: '댓글 수정이 완료되었습니다.' });

        } catch (error) {
            console.log(error);
        }
    }

    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const commentId = req.params.commentId;
            // 댓글 Id를 입력하지 않은 경우
            if (!commentId) {

            }

            const { userId } = req.body.user;

            await this.commentService.deleteComment(commentId, postId, userId);

            return res.status(200).json({ message: '댓글 삭제가 완료되었습니다.' });

        } catch (error) {
            console.log(error);
        }
    }
}