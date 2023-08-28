import express from "express";
import connectDB from "./schemas/index.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";

const app = express();
const PORT = 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", postRouter);
app.use("/post/:postId/comment", (req, res, next) => {
    req.data = req.params.postId;
    next();
})
app.use("/post/:postId/comment", commentRouter);

app.listen(PORT, () => {
    console.log(`${PORT} 서버가 열렸습니다.`);
});