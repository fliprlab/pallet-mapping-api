import { Router } from "express";
import { usersController } from "../../../controllers/users.controller";

export const userQuery = (router: Router) => {
  router.get("/get-users", usersController.getUsers);
  router.post("/add-user", usersController.addUser);
  router.post("/update-user", usersController.updateUser);
};
