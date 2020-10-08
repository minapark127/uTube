import express from "express";
import {
  changePw,
  editProfile,
  user,
  userDetail,
} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();

userRouter.get("/", user);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePw, changePw);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
