const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");

const Router = require("./routes");

//initial express
const PORT = process.env.PORT || 4002;
const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(Router);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
