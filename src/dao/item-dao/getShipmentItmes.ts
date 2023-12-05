import { ObjectId } from "mongodb";
import IteModel from "../../models/ItemModel";

interface Props {
  shipmentId: ObjectId;
}

const getShipmentItmes = (props: Props) => {
  return IteModel.find({
    shipmentId: new ObjectId(props.shipmentId),
  }).exec();
};

export default getShipmentItmes;
