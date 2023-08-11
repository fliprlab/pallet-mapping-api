import { ObjectId } from "mongodb";
import { TLocationItems } from "../../models/type/location-items";
import ShipmentsModel from "../../models/shipmentsModel";

interface Props {
  shipmentId: ObjectId;
  itemId: ObjectId;
}

const removeItemFromShipment = async (props: Props) => {
  const { shipmentId, itemId } = props;
  const addItems = await ShipmentsModel.findByIdAndUpdate(
    shipmentId,
    {
      $pull: {
        items: { _id: itemId },
      },
    },
    { new: true }
  );
  return addItems;
};

export default removeItemFromShipment;
