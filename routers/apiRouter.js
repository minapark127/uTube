import express from "express";
import { postAddViewCount } from "../controllers/videoController";
import routes from "../routes";

const apiRouter = express.Router();

apiRouter.post(routes.addViewCount, postAddViewCount);

export default apiRouter;
