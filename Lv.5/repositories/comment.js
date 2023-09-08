export class CommentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    selectAllComments = async (postId) => {
        const comments = await this.prisma.comment.findMany({ where: { postId } });

        return comments;
    }

    selectOneComment = async (commentId) => {
        const comments = await this.prisma.comment.findUnique({ where: { commentId } });

        return comments;
    }

    insertComment = async (userId, nickname, postId, content) => {
        await this.prisma.comment.create({ data: { userId, nickname, postId, content } });
    }

    updateComment = async (commentId, content) => {
        await this.prisma.comment.update({ where: { commentId }, data: { content, updatedAt: new Date() } });
    }

    deleteComment = async (commentId) => {
        await this.prisma.comment.delete({ where: { commentId } });
    }
}