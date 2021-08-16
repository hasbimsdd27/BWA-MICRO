const { Order } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.query;

    const sqlOptions = {
      where: {},
    };

    if (!!user_id) {
      sqlOptions.where = { ...sqlOptions.where, user_id };
    }

    const data = await Order.findAll(sqlOptions);

    return res.send({
      status: "success",
      data: data.map((item) => ({
        ...item.toJSON(),
        metadata: JSON.parse(item.metadata),
      })),
    });
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};
