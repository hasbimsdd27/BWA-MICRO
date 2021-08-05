const { Media } = require("../models");
const fs = require("fs");
const path = require("path");

const DeleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const media = await Media.findByPk(id);
    if (!media) {
      return res
        .status(404)
        .json({ status: "error", message: "media not found" });
    }

    fs.unlinkSync(path.join(__dirname, "../public", media.image));

    await media.destroy();

    return res.json({ status: "success", message: "image deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = DeleteImage;
