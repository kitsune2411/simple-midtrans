const apiClient = require("../config/midtrans.snap");

/**
 *
 * @param {String} aksi transaction action
 * @param {String} orderId transaction id
 * @param {Object} parameter parameter for refund
 * @return {Object} result of transaction action
 */
const transactionAction = async (aksi, orderId, parameter = null) => {
  try {
    const result = await apiClient.transaction[aksi](orderId, parameter);

    // const status = result.transaction_status;

    return result;
  } catch (error) {
    console.log(error);
  }
};

// get status of transaction that already recorded on midtrans (already `charge`-ed)
const status = async (req, res, next) => {
  const { orderId } = req.body;
  try {
    const hasil = await transactionAction("status", orderId);

    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

// approve a credit card transaction with `challenge` fraud status
const approve = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const hasil = await transactionAction("approve", orderId);
    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

// deny a credit card transaction with `challenge` fraud status
const deny = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const hasil = await transactionAction("deny", orderId);
    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

// cancel a credit card transaction or pending transaction
const cancel = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const hasil = await transactionAction("cancel", orderId);
    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

// expire a pending transaction
const expire = async (req, res, next) => {
  const { orderId } = req.body;

  try {
    const hasil = await transactionAction("expire", orderId);
    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

// refund a transaction (not all payment channel allow refund via API)
const refund = async (req, res, next) => {
  const { orderId, amount, reason } = req.body;
  const isDirect = req.query.direct;

  try {
    if (isNaN(Number(amount)))
      throw new Error(`Refund amount must a valid number`);

    const parameter = {
      amount: Number(amount),
      reason: `${reason}`,
    };

    const aksi = isDirect ? "refundDirect" : "refund";

    const hasil = await transactionAction(aksi, orderId, parameter);
    return res.status(200).send(hasil);
  } catch (error) {
    return res.status(500).end();
  }
};

module.exports = {
  status,
  approve,
  deny,
  cancel,
  expire,
  refund,
};
