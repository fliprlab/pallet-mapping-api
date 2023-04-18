import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";
import { checkUserNameAlreadyExists } from "../../../middleware/user/checkUserNameAlreadyExists.middleware";

export const userQuery = (router: Router) => {
  router.get("/get-users", usersController.getUsers);
  router.post(
    "/add-user",
    checkUserNameAlreadyExists,
    usersController.createUserHubAdmin
  );
  router.post("/update-user-status", usersController.updateUserStatus);
  router.post("/update-user-password", usersController.updateUserPassword);
};
