const { Media } = require("../models");

const GetImage = async (req, res) => {
  try {
    const media = await Media.findAll({
      raw: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return res.json({
      status: "success",
      data: media.map((item) => ({
        ...item,
        image: req.get("host") + item.image,
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = GetImage;
