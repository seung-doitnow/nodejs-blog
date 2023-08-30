import mongoose from "mongoose";

export const CommentSchema = mongoose.Schema({
    targetPost: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false,
});

export default mongoose.model("Comment", CommentSchema);