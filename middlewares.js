import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "uTube";
  res.locals.routes = routes;
  res.locals.env = process.env;
  res.locals.user = req.user || null;
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
