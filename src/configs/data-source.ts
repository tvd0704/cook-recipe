import "dotenv/config";
import { DataSource } from "typeorm";
import { entities } from "../domains/entities";

export const dataSource = new DataSource({
  type: "mysql",
  host: "sql.freedb.tech",
  port: 3306,
  username: "freedb_tvd-user",
  password: "?Sy?UQm4CBhdVw?",
  database: "freedb_cookdb",
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
