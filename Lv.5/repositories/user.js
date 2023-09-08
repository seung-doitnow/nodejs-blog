export class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    getUser = async (nickname) => {
        const user = await this.prisma.user.findUnique({ where: { nickname } });

        return user;
    }

    insertUser = async (nickname, password) => {
        await this.prisma.user.create({ data: { nickname, password } });
    }
}