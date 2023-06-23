const Snap = require("midtrans-client/lib/snap");
// Create Snap API instance
const snap = new Snap({
  isProduction: false,
  serverKey: process.env.ServerKey,
  // clientKey : process.env.ClientKey
});

module.exports = snap;
