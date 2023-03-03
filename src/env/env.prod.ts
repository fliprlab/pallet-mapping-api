class EnvProd implements EnvironmentVariable {
  baseUrl: string = "localhost";
  mondoDbUrl: string =
    "mongodb+srv://pallet:Pallet%401640@pallet-mapping.pzwkr8h.mongodb.net/live";
  jwtSecret: string =
    "$2a$10$YKnL4ZCPU2iJpnmNdtWxtO1YWw8AWg48ESn2zx.DLOZ3pV62soZdS";
  headerKey: string = "authorization";
}

export default new EnvProd();
