import { createHub } from "./createHub.controller";
import { getHubs } from "./getHubs.controller";
import { updateHubPassword } from "./updateHubPassword.controller";
import { updateHubStatus } from "./updateHubStatus.controller";

export const hubAdminController = {
  create: createHub,
  get: getHubs,
  updateStatus: updateHubStatus,
  updatePassword: updateHubPassword,
};
