import { addUserDao } from "./addUser.dao";
import { findUserByIdDao } from "./findUserById.dao";
import { findUserByNameDao } from "./findUserByName.dao";
import { getUsersDao } from "./getUsers.dao";
import { updateUserDao } from "./updateUser.dao";

export const usersDao = {
  addUserDao,
  updateUserDao,
  getUsersDao,
  findUserByNameDao,
  findUserByIdDao,
};
