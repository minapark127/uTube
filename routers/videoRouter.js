import express from "express";
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";
import routes from "../routes";

const videoRouter = express.Router();

// upload video
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// video details
videoRouter.get(routes.videoDetail(), videoDetail);

// edit videos
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//delete videos
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;
