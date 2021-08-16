const { Order, PaymentLog } = require("../../models");
const Crypto = require("crypto");
const axios = require("../../utils/axios");

const serviceCourse = axios(process.env.SERVICE_COURSE_URL);

module.exports = async (req, res) => {
  try {
    const data = req.body;
    const signatureKey = data.signature_key;
    const orderId = data.order_id;
    const grossAmount = data.gross_amount;
    const statusCode = data.status_code;
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const transactionStatus = data.transaction_status;
    const type = data.payment_type;
    const fraudStatus = data.fraud_status;

    const mySignatureKey = Crypto.createHash("sha512")
      .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
      .digest("hex");

    if (signatureKey !== mySignatureKey) {
      return res.status(400).send({
        status: "error",
        message: "invalid signature",
      });
    }

    const realOrderId = orderId.split("-")[0];
    const order = await Order.findOne({ where: { id: realOrderId } });

    if (!order) {
      return res.status(404).send({
        status: "error",
        message: "order id not found",
      });
    }

    if (order.status === "success") {
      return res.status(405).send({
        status: "error",
        message: "operation not permitted",
      });
    }

    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        order.status = "challenge";
      } else if (fraudStatus === "accept") {
        order.status = "success";
      }
    } else if (transactionStatus === "settlement") {
      order.status = "success";
    } else if (
      transactionStatus === "cancel" ||
      transactionStatus === "deny" ||
      transactionStatus === "expire"
    ) {
      order.status = "failure";
    } else if (transactionStatus === "pending") {
      order.status = "pending";
    }

    const logsData = {
      status: transactionStatus,
      raw_response: JSON.stringify(data),
      order_id: realOrderId,
      payment_type: type,
    };

    if (order.status === "success") {
      try {
        await serviceCourse.post("/my-courses/premium-access", {
          user_id: order.user_id,
          course_id: order.course_id,
        });
      } catch (error) {
        return res
          .status(error.response.status || 400)
          .send(error.response.data);
      }
    }

    await PaymentLog.create(logsData);
    await Order.update(order.toJSON(), { where: { id: order.id } });

    return res.send("ok");
  } catch (error) {
    return res.status(400).send({ status: "error", message: error.message });
  }
};
