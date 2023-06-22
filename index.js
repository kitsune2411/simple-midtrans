const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const HOST = process.env.SERVER_HOST || 'localhost'
const PORT = process.env.SERVER_PORT || 3000

app.listen(PORT, HOST, () => {
    console.log(`server running at | ${HOST}:${PORT}`);
})