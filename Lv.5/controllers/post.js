export class PostController {
    constructor(postService) {
        this.postService = postService;
    }

    // 전체 게시글 목록 조회
    getAllPosts = async (req, res, next) => {
        try {
            const posts = await this.postService.getAllPosts();

            return res.status(200).json({ posts });

        } catch (error) {
            console.log(error);
        }
    }

    // 게시글 상세 조회
    getOnePost = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const post = await this.postService.getOnePost(postId);

            return res.status(200).json({ post });

        } catch (error) {
            console.log(error);
        }
    }

    // 게시글 작성
    createPost = async (req, res, next) => {
        try {
            const { userId, nickname } = req.body.user;
            const { title, content } = req.body;

            await this.postService.createPost(userId, nickname, title, content);

            return res.status(201).json({ message: '게시글 작성이 완료되었습니다.' });

        } catch (error) {
            console.lot(error);
        }
    }

    // 게시글 수정
    updatePost = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const { userId } = req.body.user;
            const { title, content } = req.body;

            await this.postService.updatePost(postId, userId, title, content);

            return res.status(200).json({ message: '게시글 수정이 완료되었습니다.' });

        } catch (error) {
            console.lot(error);
        }
    }

    // 게시글 삭제
    deletePost = async (req, res, next) => {
        try {
            const postId = req.params.postId;
            // 게시글 Id를 입력하지 않은 경우
            if (!postId) {

            }

            const { userId } = req.body.user;

            await this.postService.deletePost(postId, userId);

            return res.status(200).json({ message: '게시글 삭제가 완료되었습니다.' });

        } catch (error) {
            console.lot(error);
        }
    }
}