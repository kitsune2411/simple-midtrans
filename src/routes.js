const { Router } = require("express");
const createTransaction = require("./controllers/createTransaction");
const transactionActions = require("./controllers/transactionActions");
const transactionNotification = require("./controllers/transactionNotification");
const router = new Router();

router.get("/hola", (req, res) => {
  return res.status(200).json({ message: "it's working" });
});

router.post("/createTransaction", createTransaction);
router.post("/statusTransaction", transactionActions.status);
router.post("/approveTransaction", transactionActions.approve);
router.post("/cancelTransaction", transactionActions.cancel);
router.post("/denyTransaction", transactionActions.deny);
router.post("/expireTransaction", transactionActions.expire);
router.post("/refundTransaction", transactionActions.refund);

router.post("/transactionNotification", transactionNotification);

module.exports = router;
