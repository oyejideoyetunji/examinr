import express from "express";
import { config, errorHandler } from "./shared";
import { createUserModule } from "./modules/user/user.module";
import { OrmUserRepository } from "./modules/user/infrastructure";

const app = express();
const PORT = config.api.port;

app.use(express.json());

app.use("/api/v1/users", createUserModule(new OrmUserRepository()))

app.use("", (_, res) => {
  res.status(200).send({ "message": "OK" });
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is now running at http://localhost:${PORT}`);
});
