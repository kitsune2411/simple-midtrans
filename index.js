const express = require("express");
require("dotenv").config();
const routes = require("./src/routes");
const app = express();

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send({
    err: true,
    message: "Not Found",
  });
});

const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, HOST, () => {
  console.log(`server running at | ${HOST}:${PORT}`);
});

module.exports = app;
