type Environment = "dev" | "prod" | undefined | String;

type EnvironmentVariable = {
  mondoDbUrl: string;
  baseUrl: string;
  jwtSecret: string;
  headerKey: string;
};
