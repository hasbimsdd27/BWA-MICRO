const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");

//router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");
const mediaRouter = require("./routes/media");
const orderRouter = require("./routes/orders");
const paymentRouter = require("./routes/payments");

//initial express
const PORT = process.env.PORT || 4000;
const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", courseRouter);
app.use("/media", mediaRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
