import { generateAuthToken } from "./generateToken.dao";
import { generateTokenHub } from "./generateTokenHub.dao";

export const tokenDao = {
  generateAuthToken: generateAuthToken,
  generateTokenHub: generateTokenHub,
};
