import Joi from 'joi';

const joi = Joi.defaults((schema) => schema.options({
    messages: {
        'string.min': '은(는) {#limit}자 이상이어야 합니다.',
        'string.alphanum': '은(는) 숫자와 알파벳 대소문자만 사용할 수 있습니다.',
        'includeNickname': '은(는) 닉네임이 포함되어서는 안됩니다.',
        'any.only': '와(과) {#label}가 일치하지 않습니다.',
        'any.required': '을(를) 입력해주세요.'
    }
}));

const jois = {
    signUp: joi.object({
        nickname: joi.string().min(3).alphanum().required(),
        password: joi.string().min(4).custom((value, helpers) => value.includes(helpers.state.ancestors[0]['nickname']) ? helpers.error('includeNickname') : value).required(),
        confirm: joi.string().valid(joi.in('password')).required().label('비밀번호'),
    }),

    login: joi.object({
        nickname: joi.string().required(),
        password: joi.string().required(),
    }),

    createPost: joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
    }),

    updatePost: joi.object({
        title: joi.string().required(),
        content: joi.string().required(),
    }),

    createComment: joi.object({
        content: joi.string().required(),
    }),

    updateComment: joi.object({
        content: joi.string().required(),
    })
};

export default jois;