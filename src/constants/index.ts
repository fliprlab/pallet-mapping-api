export const PALLET_STATUS = {
  created: "pallet-created",
  asignGrig: "pallet-asign-grid",
  out: "pallet-out",
};

export const regExpLocation = (location: string) =>
  new RegExp("^" + location + "$", "i");

export const regExpZone = (zone: string) => new RegExp("^" + zone + "$", "i");

export const REGX = {
  PALLET_ID: /^[1-9][0-9]{4}$/,
  GRID_ID: /^G[0-9]{3}-[0-9]{2}$/,
  PALLET_ITEMS: /^[A-Z]{4}[0-9]{10}$|^\d{13}$|^\d{14}$/,
  LPST: /^([0-1]?\d|2[0-3])(?::([0-5]?\d))?(?::([0-5]?\d))?$/,
};
