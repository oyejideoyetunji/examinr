import express from "express";
import { config } from "./shared/config";
import { errorHandler } from "./shared/middlewares";
import { createUserModule } from "./modules/user/user.module";
import { createAuthModule } from "./modules/auth/auth.module";

const app = express();
const PORT = config.api.port;

app.use(express.json());

app.use("/api/v1/auth", createAuthModule().router)
app.use("/api/v1/users", createUserModule().router)

app.use("", (_, res) => {
  res.status(200).send({ "message": "OK" });
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is now running at http://localhost:${PORT}`);
});
