export const ZONE_ID_REG = new RegExp("^[A-Z][0-9]-[LR][0-9]{1,2}$");
export const ZONE_REG = new RegExp("^[A-Z][0-9]$");

const valideZoneId = (zone: string) => {
  return ZONE_ID_REG.test(zone);
};

const valideZone = (zone: string) => {
  return ZONE_REG.test(zone);
};

export default {
  valideZoneId,
  valideZone,
};
