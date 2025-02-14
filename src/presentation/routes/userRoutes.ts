import express from "express";
import { userController } from "../DIP/userDIP";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup.bind(userController));
userRouter.post("/login",userController.login.bind(userController))

export default userRouter;
