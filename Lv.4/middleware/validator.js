import jois from '../util/joi.js';
import { customErrorCodes, convertKey } from './../util/definition.js';

export default function (validationType) {
    return async function (req, res, next) {
        const validated = jois[validationType].validate(req.body);

        // 에러 발생시 validated 내부에 error라는 객체가 존재함
        if (!validated.error) {
            req.body = validated.value;
            next();
        } else {
            const errorDetail = validated.error.details[0];
            const message = convertKey[errorDetail['context']['key']] + errorDetail['message'];
            next({ code: customErrorCodes['9_No_Pass_Validator'], message });
        }
    }
};