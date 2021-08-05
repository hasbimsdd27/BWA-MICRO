const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");
const path = require("path");

const Router = require("./routes");

//initial express
const PORT = process.env.PORT || 4000;
const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use("/images", express.static(path.join(__dirname, "./public/images")));

app.use(Router);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
