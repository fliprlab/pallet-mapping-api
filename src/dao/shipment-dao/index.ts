import { addShipment } from "./addShipment";
import { getShipmentById } from "./getShipmentById";
import { getShipments } from "./getShipments";
import pushItemToShipment from "./pushItemToShipment";
import removeItemFromShipment from "./removeItemFromShipment";
import { updateShipment } from "./updateShipment";

export const shipmentDao = {
  addShipment,
  updateShipment,
  getShipments,
  getShipmentById,
  pushItemToShipment,
  removeItemFromShipment,
};
