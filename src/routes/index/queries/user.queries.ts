import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";
import { maxLoginRequest } from "../index.route";

export const userQuries = (router: Router) => {
  router.post("/user-login",maxLoginRequest, usersController.loginUser);
};
