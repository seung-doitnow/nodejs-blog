export class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    // 회원 가입
    signUp = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
            await this.userService.createUser(nickname, password);

            return res.status(201).json({ message: '회원 가입이 완료되었습니다.' });

        } catch (error) {
            console.log(error);
        }
    }

    // 로그인
    signIn = async (req, res, next) => {
        try {
            const { nickname, password } = req.body;
            const userJWT = await this.userService.getAuthority(nickname, password);
            res.cookie('authorization', `Bearer ${userJWT}`);

            return res.status(200).json({ token: userJWT });

        } catch (error) {
            console.log(error);
        }
    }
}