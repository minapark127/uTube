import express from "express";
import {
  changePw,
  editProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePw, onlyPrivate, changePw);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
