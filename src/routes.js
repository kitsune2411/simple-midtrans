const { Router } = require("express");
const router = new Router();

router.get("/hola", (req, res) => {
  return res.status(200).json({ message: "it's working" });
});

module.exports = router;
