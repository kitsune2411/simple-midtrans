const { sha512 } = require("js-sha512");
const apiClient = require("../config/midtrans.snap");

module.exports = async (req, res) => {
  const midtransNotif = req.body;

  try {
    const isValid = verifyNotif(
      midtransNotif.order_id,
      midtransNotif.status_code,
      midtransNotif.gross_amount,
      midtransNotif.signature_key
    );

    if (!isValid) throw new Error("Notification is not valid!");

    const result = await apiClient.transaction.notification(midtransNotif);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

/**
 *
 * @param {String} orderId order id of midtrans notif
 * @param {String} statusCode status code of midtrans notif
 * @param {String} grossAmount gross amout of midtrans notif
 * @param {String} signatureKey signature key of midtrans notif
 * @return {Boolean} validity of the midtrans notification
 */
function verifyNotif(orderId, statusCode, grossAmount, signatureKey) {
  const verifyKey = sha512(
    orderId + statusCode + grossAmount + process.env.ServerKey
  );

  return signatureKey === verifyKey;
}
