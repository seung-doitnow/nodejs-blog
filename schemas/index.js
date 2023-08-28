import mongoose from "mongoose";
import "./../env.js";
import { DB_ID, DB_PASSWORD } from "./../db.js";

const connect = () => {
    mongoose.connect(`mongodb+srv://${DB_ID}:${DB_PASSWORD}@express.snbbdil.mongodb.net/?retryWrites=true&w=majority`,
        { dbName: "blog" })
        .catch((error) => console.log(error))
        .then(() => console.log("DB 연결 성공"));
};

export default connect;