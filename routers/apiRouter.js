import express from "express";
import {
  postAddComment,
  postAddViewCount,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addViewCount, postAddViewCount);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
