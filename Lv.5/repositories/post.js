export class PostRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    selectAllPosts = async () => {
        const posts = await this.prisma.post.findMany({});

        return posts;
    }

    selectOnePost = async (postId) => {
        const post = await this.prisma.post.findUnique({ where: { postId } });

        return post;
    }

    insertPost = async (userId, nickname, title, content) => {
        await this.prisma.post.create({ data: { userId, nickname, title, content } });
    }

    updatePost = async (postId, title, content) => {
        await this.prisma.post.update({ where: { postId }, data: { title, content, updatedAt: new Date() } });
    }

    deletePost = async (postId) => {
        await this.prisma.post.delete({ where: { postId } });
    }
}