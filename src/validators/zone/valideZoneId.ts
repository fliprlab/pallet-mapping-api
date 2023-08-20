const valideZoneId = (zone: string) => {
  const reg = new RegExp("^[zdZD]\\d{1,5}-[a-zA-Z]\\d$");
  return reg.test(zone);
};

export const ZONE_REG = new RegExp("^[zdZD]\\d{1,5}$");

const valideZone = (zone: string) => {
  return ZONE_REG.test(zone);
};

export default {
  valideZoneId,
  valideZone
};
