const valideZoneId = (zone: string) => {
  const reg = new RegExp("^[zdZD]\\d{1,5}-[a-zA-Z]\\d$");
  return reg.test(zone);
};

export default valideZoneId;
