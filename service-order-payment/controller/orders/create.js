const { Order } = require("../../models");
const RandomString = require("../../utils/randomString");
const getSnapUrl = require("../../utils/midtransSnapUrl");

module.exports = async (req, res) => {
  try {
    const { course, user } = req.body;
    const order = await Order.create({
      user_id: user.id,
      course_id: course.id,
    });

    const transaction_details = {
      order_id: `${order.id}-${RandomString(5)}`,
      gross_amount: course.price,
    };

    const item_details = [
      {
        id: course.id,
        price: course.price,
        quantity: 1,
        name: course.name,
        brand: "BWA micro",
        category: "Online Course",
      },
    ];

    const customer_details = {
      first_name: user.name,
      email: user.email,
    };

    const midtransParams = {
      transaction_details,
      item_details,
      customer_details,
    };

    const snapUrl = await getSnapUrl(midtransParams);

    await Order.update(
      {
        ...order.toJSON(),
        snap_url: snapUrl,
        metadata: {
          course_id: course.id,
          course_price: course.price,
          course_name: course.name,
          thumbnail: course.thumbnail,
          level: course.level,
        },
      },
      { where: { id: order.id } }
    );

    return res.send({
      status: "success",
      data: {
        ...order.toJSON(),
        snap_url: snapUrl,
        metadata: {
          course_id: course.id,
          course_price: course.price,
          course_name: course.name,
          thumbnail: course.thumbnail,
          level: course.level,
        },
      },
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};
