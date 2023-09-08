import { customErrorCodes } from './../utils/definition.js';

export class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    getAllPosts = async () => {
        const posts = await this.postRepository.selectAllPosts();
        posts.sort((lhs, rhs) => rhs.createdAt - lhs.createdAt);

        return posts.map((post) => {
            return {
                postId: post.postId,
                userId: post.userId,
                nickname: post.nickname,
                title: post.title,
                likeCount: post.likeCount,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });
    }

    getOnePost = async (postId) => {
        const post = await this.postRepository.selectOnePost(postId);
        // 입력받은 게시글 Id에 해당하는 게시글이 존재하지 않는 경우
        if (!post) {

        }

        return {
            postId: post.postId,
            userId: post.userId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            likeCount: post.likeCount,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }
    }

    createPost = async (userId, nickname, title, content) => {
        await this.postRepository.insertPost(userId, nickname, title, content);
    }

    updatePost = async (postId, userId, title, content) => {
        const post = await this.postRepository.selectOnePost(postId);
        // 입력받은 게시글 Id를 가진 게시글이 존재하지 않는 경우
        if (!post) {

        }

        // 해당 게시글의 작성자가 아닌 경우
        if (post.userId !== userId) {

        }

        await this.postRepository.updatePost(postId, title, content);
    }

    deletePost = async (postId, userId) => {
        const post = await this.postRepository.selectOnePost(postId);
        // 입력받은 게시글 Id를 가진 게시글이 존재하지 않는 경우
        if (!post) {

        }

        // 해당 게시글의 작성자가 아닌 경우
        if (post.userId !== userId) {

        }

        await this.postRepository.deletePost(postId);
    }
}