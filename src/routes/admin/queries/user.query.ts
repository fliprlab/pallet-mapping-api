import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";
import { checkUserNameAlreadyExists } from "../../../middleware/user/checkUserNameAlreadyExists.middleware";

export const userQuery = (router: Router) => {
  router.get("/get-users", usersController.getUsers);
  router.post("/add-user", checkUserNameAlreadyExists, usersController.addUser);
  router.post(
    "/update-user",
    checkUserNameAlreadyExists,
    usersController.updateUser
  );
};
