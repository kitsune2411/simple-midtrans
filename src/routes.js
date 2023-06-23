const { Router } = require("express");
const createTransaction = require("./controllers/createTransaction");
const router = new Router();

router.get("/hola", (req, res) => {
  return res.status(200).json({ message: "it's working" });
});

router.post("/createTransaction", createTransaction);

module.exports = router;
