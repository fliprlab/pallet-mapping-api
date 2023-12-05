import { ObjectId } from "mongodb";
import LocationItemsModel from "../../models/LocationItemsModel";

interface Props {
  shipmentId: ObjectId;
  virtualId: string;
}

const updateVirtualId = (props: Props) => {
  return LocationItemsModel.updateMany(
    {
      shipmentId: new ObjectId(props.shipmentId),
    },
    {
      $set: {
        virtualId: props.virtualId,
      },
    }
  ).exec();
};

export default updateVirtualId;
