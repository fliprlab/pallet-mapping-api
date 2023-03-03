import { addProfile } from "./addProfile";
import { getProfile } from "./getProfile";
import { loginAdmin } from "./login";

export const adminController = {
  login: loginAdmin,
  getProfile: getProfile,
  addProfile,
};
