import LocationItemsModel from "../../models/LocationItemsModel";

export const checkDuplicateLocationItemDao = async (
  itemId: string,
  uploadFor?: {
    destination: string;
    hub: string;
  }
): Promise<boolean> => {
  const item = await LocationItemsModel.findOne({
    itemId: itemId,
  })
    .sort({ _id: -1 })
    .exec();

  if (!item) {
    return false;
  }

  // if hub is same for new item & previous item and destination is different than it can be upload
  else if (
    item.hub?.origin.toUpperCase() === uploadFor?.hub.toUpperCase() &&
    item.destination.toUpperCase() !== uploadFor?.destination.toUpperCase()
  ) {
    return false;
  }

  // check conditions
  else if (item.status === "created" || item.status === "picked up") {
    return true;
  }

  return false;
};
