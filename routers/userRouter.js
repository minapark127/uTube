import express from "express";
import {
  changePw,
  getEditProfile,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePw, onlyPrivate, changePw);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
