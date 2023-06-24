const { nanoid } = require("nanoid");
const midtrans = require("../config/midtrans.snap");

const sampleItem = [
  {
    id: "a01",
    price: 7000,
    quantity: 1,
    name: "Apple",
  },
  {
    id: "b02",
    price: 3000,
    quantity: 2,
    name: "Orange",
  },
];

const sampleCustomer = {
  first_name: "Budi",
  last_name: "Susanto",
  email: "budisusanto@example.com",
  phone: "+628123456789",
  //   billing_address: {
  //     first_name: "Budi",
  //     last_name: "Susanto",
  //     email: "budisusanto@example.com",
  //     phone: "08123456789",
  //     address: "Sudirman No.12",
  //     city: "Jakarta",
  //     postal_code: "12190",
  //     country_code: "IDN",
  //   },
  //   shipping_address: {
  //     first_name: "Budi",
  //     last_name: "Susanto",
  //     email: "budisusanto@example.com",
  //     phone: "0812345678910",
  //     address: "Sudirman",
  //     city: "Jakarta",
  //     postal_code: "12190",
  //     country_code: "IDN",
  //   },
};

const paymentOptions = [
  "credit_card",
  "bca_va",
  "permata_va",
  "bni_va",
  "bri_va",
  "echannel",
  "other_va",
  "gopay", // need fix
  "shopeepay",
  "other_qris",
  // "bca_klikbca", not working
  "bca_klikpay",
  "cimb_clicks",
  "bri_epay",
  "danamon_online",
  "mandiri_clickpay",
  "uob_ezpay",
  "indomaret",
  "alfamart",
  "kredivo",
  "akulaku",
  "indosat_dompetku",
  "mandiri_ecash",
  "kioson",
  "gci",
];

module.exports = async (req, res) => {
  const {
    orderId = nanoid(),
    orderItem = sampleItem,
    customerInfo = sampleCustomer,
    paymentChannel = paymentOptions[9],
  } = req.body;
  try {
    // console.log("payment method", paymentChannel);
    const parameter = {
      transaction_details: {
        order_id: `Order-${orderId}`,
        gross_amount: calculateGrossAmount(orderItem),
      },
      credit_card: {
        secure: true,
      },
      enabled_payments: [paymentChannel],
      item_details: orderItem,
      customer_details: customerInfo,
    };

    const result = await midtrans.createTransaction(parameter);

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    const errMessage =
      error?.ApiResponse?.error_messages ?? "Internal Server Error";
    return res.status(500).send(errMessage);
  }
};

/**
 *
 * @param {Array} item array of order items
 * @return {Number} Gross amout of the order
 */
function calculateGrossAmount(item) {
  let total = 0;

  for (const el of item) {
    total += el.price * el.quantity;
  }

  return total;
}
