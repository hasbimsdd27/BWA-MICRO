const midtransClient = require("midtrans-client");
// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: process.env.STAGING === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

module.exports = async (params) => {
  const parameter = {
    ...params,
    credit_card: {
      secure: true,
    },
  };
  const transaction = await snap.createTransaction(parameter);
  return transaction.redirect_url;
};
