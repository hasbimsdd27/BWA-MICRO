const isBase64 = require("is-base64");
const base64Img = require("base64-image");
const path = require("path");
const fs = require("fs");

const { Media } = require("../models");

const CreateImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!isBase64(image, { mimeRequired: true })) {
      return res
        .status(400)
        .json({ status: "error", message: "invalid base64" });
    }
    const filename = Date.now() + `.${image.split(";")[0].split("/")[1]}`;

    fs.writeFile(
      path.join(__dirname, "../public/images", filename),
      image.split(",")[1],
      "base64",
      (err) => {
        if (err) {
          return res
            .status(500)
            .send({ status: "error", message: error.message });
        }
      }
    );

    const media = await Media.create({ image: `/images/${filename}` });

    return res.json({
      status: "success",
      data: {
        id: media.id,
        image: req.get("host") + media.image,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = CreateImage;
