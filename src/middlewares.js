import aws from "aws-sdk";
import multerS3 from "multer-s3";
import multer from "multer";
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-southeast-2",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "utube-mina.park127/videos",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "utube-mina.park127/avatars",
  }),
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "uTube";
  res.locals.routes = routes;
  res.locals.env = process.env;
  res.locals.loggedInUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatarFile");
