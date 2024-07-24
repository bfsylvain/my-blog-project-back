require("dotenv").config({ path: "./config/.env" });
require("./config/database/db");

const app = require("./app")

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.log(`server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("error: ", err.message);
  });
