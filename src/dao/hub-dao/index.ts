import { createHubAdminDao } from "./createHubAdmin.dao";
import { updateHubAdminDao } from "./updateHubAdmin.dao";

export const HubAdminDao = {
  createDao: createHubAdminDao,
  updateDao: updateHubAdminDao,
};
