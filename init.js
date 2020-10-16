import "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";

const PORT = 4000;

const handleListening = () =>
  console.log(` ✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
