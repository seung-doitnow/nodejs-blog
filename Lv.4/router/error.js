import { customErrorCodes, customErrorMessages, convertResCode } from './../util/definition.js';

const errorHandler = async (error, req, res, next) => {
    // 커스텀 에러별 클라이언트에게 전달할 상태 코드 할당, 이 때 statusCode가 undefined라면 명시적으로 처리하지 않은 에러가 발생한 것이기 때문에 400 에러로 처리
    const statusCode = convertResCode[error.code];
    if (statusCode === undefined) {
        return res.status(400).json({ errorMessage: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' });
    }
    // 커스텀 에러별 클라이언트에게 전달할 메시지 할당, 이 때 validator가 보낸 에러는 메시지를 만들어서 오기 때문에 제외
    if (error.code === customErrorCodes['9_No_Pass_Validator']) {
        return res.status(statusCode).json({ errorMessage: error.message });
    }
    const errorMessage = customErrorMessages[error.code];

    return res.status(statusCode).json({ errorMessage });
}

export default errorHandler;