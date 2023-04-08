import { addUser } from "./addUser.controller";
import { getUserProfile } from "./getUserProfile";
import { getUsers } from "./getUsers.controller";
import { loginUser } from "./login";
import { updateUser } from "./updateUser.controller";

export const usersController = {
  addUser,
  updateUser,
  getUsers,
  loginUser,
  getUserProfile,
};
