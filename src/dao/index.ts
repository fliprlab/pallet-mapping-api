import destination from "./destination";
import { locationItemsDao } from "./location-item-dao";
import { locationDao } from "./locations-dao";
import { palletDao } from "./pallet-dao";
import { shipmentDao } from "./shipment-dao";
import zone from "./zone";

const dao = {
  zone: zone,
  destination: destination,
  location: locationDao,
  pallet: palletDao,
  items: locationItemsDao,
  shipment: shipmentDao,
};

export default dao;
