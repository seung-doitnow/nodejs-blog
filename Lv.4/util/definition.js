const customErrorCodes = {
    '1_Duplicate_Nickname': 1,
    '2_No_Exist_Nickname': 2,
    '3_No_Match_Password': 3,
    '4_No_Exist_PostId': 4,
    '5_No_Exist_Post': 5,
    '6_No_Permission_Update': 6,
    '7_No_Permission_Delete': 7,
    '8_No_Exist_CommentId': 8,
    '9_No_Pass_Validator': 9,
    '10_No_Exist_Comment': 10,
    '11_No_Cookie': 11,
    '12_Expired_Token': 12,
    '13_No_Match_Token': 13,
};

// '9_No_Pass_Validator' 에러는 메시지가 생성된 상태로 도착하기 때문에 선언 할 필요 X
const customErrorMessages = {
    [customErrorCodes["1_Duplicate_Nickname"]]: '중복된 닉네임입니다.',
    [customErrorCodes["2_No_Exist_Nickname"]]: '존재하지 않는 닉네임입니다.',
    [customErrorCodes["3_No_Match_Password"]]: '비밀번호가 틀립니다.',
    [customErrorCodes["4_No_Exist_PostId"]]: '게시글 번호를 입력해주세요.',
    [customErrorCodes["5_No_Exist_Post"]]: '존재하지 않는 게시글입니다.',
    [customErrorCodes["6_No_Permission_Update"]]: '수정 권한이 없습니다.',
    [customErrorCodes["7_No_Permission_Delete"]]: '삭제 권한이 없습니다.',
    [customErrorCodes["8_No_Exist_CommentId"]]: '댓글 번호를 입력해주세요.',
    [customErrorCodes["10_No_Exist_Comment"]]: '존재하지 않는 댓글입니다.',
    [customErrorCodes["11_No_Cookie"]]: '로그인이 필요한 서비스입니다.',
    [customErrorCodes["12_Expired_Token"]]: '토큰이 만료되었습니다. 다시 로그인 해주세요.',
    [customErrorCodes["13_No_Match_Token"]]: '토큰이 변조되었습니다. 다시 로그인 해주세요.',
};

const convertResCode = {
    [customErrorCodes["1_Duplicate_Nickname"]]: 412,
    [customErrorCodes["2_No_Exist_Nickname"]]: 412,
    [customErrorCodes["3_No_Match_Password"]]: 412,
    [customErrorCodes["4_No_Exist_PostId"]]: 400,
    [customErrorCodes["5_No_Exist_Post"]]: 404,
    [customErrorCodes["6_No_Permission_Update"]]: 403,
    [customErrorCodes["7_No_Permission_Delete"]]: 403,
    [customErrorCodes["8_No_Exist_CommentId"]]: 400,
    [customErrorCodes["9_No_Pass_Validator"]]: 412,
    [customErrorCodes["10_No_Exist_Comment"]]: 404,
    [customErrorCodes["11_No_Cookie"]]: 403,
    [customErrorCodes["12_Expired_Token"]]: 403,
    [customErrorCodes["13_No_Match_Token"]]: 403,
}

const convertKey = {
    nickname: '닉네임',
    password: '비밀번호',
    confirm: '비밀번호 확인',
    title: '제목',
    content: '내용',
};

export { customErrorCodes, customErrorMessages, convertResCode, convertKey };