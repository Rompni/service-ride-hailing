import express from "express";
import { AppDataSource } from "./database/data-source";
import validateEnv from "../config/validate-env";
import config from "config";

AppDataSource.initialize()
  .then(async () => {
    // Validating environment variables
    validateEnv();

    // create express app
    const app = express();
    app.use(express.json());

    // register express routes from defined application routes

    // setup express app here

    // start express server
    const port = config.get<number>("port");
    app.listen(port);

    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port} to see results`
    );
  })
  .catch((error) => console.log(error));
