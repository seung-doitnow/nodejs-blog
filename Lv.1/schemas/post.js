import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    password: {
        type: Number,
        required: true,
    }
}, {
    versionKey: false,
})

export default mongoose.model("Post", PostSchema);