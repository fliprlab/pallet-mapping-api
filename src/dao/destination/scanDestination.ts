import dao from "..";
import validators from "../../validators";

interface Props {
  inputString: string;
}

const scanDestination = async (props: Props): Promise<string> => {
  const { inputString } = props;
  let destination = "";
  if (validators.zone.valideZoneId(inputString)) {
    const getDestination = await dao.zone.findZone(inputString);
    getDestination && (destination = getDestination.zone);
  } else {
    const location = await dao.location.getLocationByName(inputString);
    location && (destination = location.location);
  }
  return destination;
};

export default scanDestination;
