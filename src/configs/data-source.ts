import "dotenv/config";
import { DataSource } from "typeorm";
import { entities } from "../domains/entities";

export const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities,
});


dataSource
  .initialize()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err:any) => {
    console.error("Database connection failed", err);
  });
