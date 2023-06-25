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

app.get("/", (req, res) => {
  return res.status(200).json({ message: "server is online" });
});

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).send({
    err: true,
    message: "Not Found",
  });
});

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running `);
});

module.exports = app;
