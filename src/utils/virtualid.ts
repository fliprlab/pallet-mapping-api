import { locationItemsDao } from "../dao/location-item-dao";
import { shipmentDao } from "../dao/shipment-dao";
import { ObjectId } from "mongodb";

type TSplitVirtualId = {
  symbol: string;
  pallet: string;
  itemsLength: number;
  counting: number;
};

const splitVirtualId = (vId: string): TSplitVirtualId => {
  const virtualId: TSplitVirtualId = {
    symbol: "",
    pallet: "",
    itemsLength: 0,
    counting: 0,
  };
  const split = vId.split("-");
  virtualId.symbol = split[0][0];
  virtualId.pallet = split[0].substring(1);
  virtualId.itemsLength = Number(split[1]);
  virtualId.counting = split.length > 2 ? Number(split[2]) : 0;
  return virtualId;
};

const splitIdToString = (splitId: TSplitVirtualId) => {
  return `${splitId.symbol}${splitId.pallet}-${splitId.itemsLength}-${splitId.counting}`;
};

const getNew = async (palletId: string) => {
  const lastShipment = await shipmentDao.getLastShipment();
  if (lastShipment.length == 0) {
    return "B" + palletId + "-" + "0" + Date.now();
  }
  const splitId = splitVirtualId(lastShipment[0].virtualId);
  return "B" + palletId + "-" + "0" + "-" + splitId.counting + 1;
};

const getVirtualId = async (props: { shipmentId: ObjectId }) => {
  const { shipmentId } = props;
  const { getShipmentById } = shipmentDao;
  const shipment = await getShipmentById(shipmentId.toString());
  if (!shipment) {
    return "";
  }
  const virtualId = shipment.virtualId;
  return virtualId;
};

/**
 * Use this function after update item in the shipment
 * @param props Shipment ID type Mongodb ObjectId
 * @returns
 */
const updateVirtualId = async (props: { shipmentId: ObjectId }) => {
  const { shipmentId } = props;
  const shipment = await shipmentDao.getShipmentById(shipmentId.toString());
  if (!shipment) {
    return "";
  }
  const splitId = splitVirtualId(shipment.virtualId);
  splitId.itemsLength = shipment.items.length;
  const virtualId = splitIdToString(splitId);
  locationItemsDao.updateVirtualId({
    shipmentId: shipment._id,
    virtualId: virtualId,
  });
  shipmentDao.updateShipment(shipment._id, {
    virtualId: virtualId,
  });
};

export default {
  getNew,
  getVirtualId,
  updateVirtualId,
};
