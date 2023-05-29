import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    POSTGRES_HOST: str(),
    POSTGRES_PORT: port(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    WOMPI_PUBLIC_KEY: str(),
    WOMPI_PRIVATE_KEY: str(),
    WOMPI_BASE_URL: str(),
    WOMPI_ACCEPTATION_TOKEN: str(),
  });
};

export default validateEnv;
