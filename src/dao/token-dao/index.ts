import { generateAuthToken } from "./generateToken.dao";
import { generateTokenHub } from "./generateTokenHub.dao";
import { verifyTokenDao } from "./verifyToken.dao";

export const tokenDao = {
  generateAuthToken: generateAuthToken,
  generateTokenHub: generateTokenHub,
  verifyTokenDao,
};
