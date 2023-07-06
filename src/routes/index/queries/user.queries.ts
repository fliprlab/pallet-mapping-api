import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";
import { maxUserLoginAttempts } from "../../../middleware/user/maxUserLoginAttempts";

export const userQuries = (router: Router) => {
  router.post("/user-login", maxUserLoginAttempts, usersController.loginUser);
};
