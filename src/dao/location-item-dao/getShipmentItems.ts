import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

interface Props {
  shipmentId: ObjectId;
}

export const getShipmentItems = async (props: Props) => {
  const { shipmentId } = props;
  return LocationItemsModel.find({
    shipmentId: shipmentId,
  }).exec();
};
