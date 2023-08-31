import joi from 'joi';

const PostIdJoi = joi.string().required();
const CommentIdJoi = joi.string().required();
const PasswordJoi = joi.string().required();
const WritePostJoi = joi.object({
    user: joi.string().required(),
    title: joi.string().required(),
    content: joi.string().required(),
    password: joi.string().required(),
});
const UpdatePostJoi = joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
    password: joi.string().required(),
});
const WriteCommentJoi = joi.object({
    user: joi.string().required(),
    content: joi.string().required(),
    password: joi.string().required(),
});
const UpdateCommentJoi = joi.object({
    content: joi.string().required(),
    password: joi.string().required(),
});

class Validator {
    PostId = (data) => { return PostIdJoi.validate(data); };
    CommentId = (data) => { return CommentIdJoi.validate(data); };
    Password = (data) => { return PasswordJoi.validate(data); };
    WritePostData = (data) => { return WritePostJoi.validate(data); }
    UpdatePostData = (data) => { return UpdatePostJoi.validate(data); }
    WriteCommentData = (data) => { return WriteCommentJoi.validate(data); }
    UpdateCommentData = (data) => { return UpdateCommentJoi.validate(data); }
}

export const DataValidator = new Validator();