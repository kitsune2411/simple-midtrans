const { nanoid } = require("nanoid");
const midtrans = require("../config/midtrans.snap");

module.exports = async (req, res) => {
  const { orderId = nanoid(), orderItem, user, paymentChannel } = req.body;
  try {
    const parameter = {
      transaction_details: {
        order_id: `Order-${orderId}`,
        gross_amount: 13000,
      },
      credit_card: {
        secure: true,
      },
      enabled_payments: ["other_qris"],
      item_details: [
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
      ],
      customer_details: {
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
      },
    };

    const result = await midtrans.createTransaction(parameter);

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).end();
  }
};
