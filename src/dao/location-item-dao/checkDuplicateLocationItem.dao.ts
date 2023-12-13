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
  // Same Hub & Destination than show duplicate
  else if (
    item.hub?.origin.toUpperCase() === uploadFor?.hub.toUpperCase() &&
    item.destination.toUpperCase() === uploadFor?.destination.toUpperCase()
  ) {
    return true;
  }

  return false;
};
