import { addShipment } from "./addShipment";
import { getShipmentById } from "./getShipmentById";
import { getShipments } from "./getShipments";
import { updateShipment } from "./updateShipment";

export const shipmentDao = {
  addShipment,
  updateShipment,
  getShipments,
  getShipmentById,
};
