import { ObjectId } from "mongodb";
import { TShipmentStatus } from "../../models/type/location-items";
import LocationItemsModel from "../../models/LocationItemsModel";

interface Props {
  shipmentId: ObjectId;
  status: TShipmentStatus;
}

export const updateStatus = async (props: Props) => {
  const { status, shipmentId } = props;
  return await LocationItemsModel.updateMany(
    { shipmentId, cancelled: false },
    {
      $set: { status },
    }
  ).exec();
};
