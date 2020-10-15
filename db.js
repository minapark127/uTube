import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/uTube", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log(" ✅ Successfully connected to DB");
const handleError = (err) => console.log(` ❌ ERROR!! : ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);
