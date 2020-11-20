import express from "express";
import {
  deleteComment,
  postAddComment,
  postAddViewCount,
} from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addViewCount, postAddViewCount);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;
