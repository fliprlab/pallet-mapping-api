import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";

export const userQuries = (router: Router) => {
  router.post("/user-login", usersController.loginUser);
};
