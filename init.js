import "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";
import "./models/AnonymousUser";

const PORT = 4000;

const handleListening = () =>
  console.log(` ✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
