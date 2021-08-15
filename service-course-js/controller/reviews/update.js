const { Review, MyCourse } = require("../../models");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      rating: "number|min:1|max:5|optional",
      note: "string|optional",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const review = await Review.findOne({
      where: { id: req.params.id },
      raw: true,
    });

    if (!review) {
      return res.status(404).json({
        status: "error",
        message: "review not found",
      });
    }

    await Review.update(
      { rating: req.body.rating, note: req.body.note },
      { where: { id: req.params.id } }
    );

    return res.json({
      status: "success",
      data: { ...review, rating: req.body.rating, note: req.body.note },
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
