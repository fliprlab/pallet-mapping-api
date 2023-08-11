import { ObjectId } from "mongodb";
import { TLocationItems } from "../../models/type/location-items";
import ShipmentsModel from "../../models/shipmentsModel";

interface Props {
  shipmentId: ObjectId;
  item: TLocationItems;
}

const pushItemToShipment = async (props: Props) => {
  const { shipmentId, item } = props;
  const addItems = await ShipmentsModel.findByIdAndUpdate(
    shipmentId,
    {
      $push: {
        items: item,
      },
    },
    { new: true }
  );
  return addItems;
};

export default pushItemToShipment;
