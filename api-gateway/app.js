const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");

//router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courses");
const chapterRouter = require("./routes/chapters");
const lessonRouter = require("./routes/lessons");
const imageCoursesRouter = require("./routes/imageCourses");
const myCoursesRouter = require("./routes/myCourses");
const reviewsRouter = require("./routes/reviews");
const mediaRouter = require("./routes/media");
const orderRouter = require("./routes/orders");
const paymentRouter = require("./routes/payments");
const mentortRouter = require("./routes/mentors");
const refreshTokenRouter = require("./routes/refreshToken");

//middleware
const verifyToken = require("./middleware/verifyToken");

//initial express
const PORT = process.env.PORT || 4000;
const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", courseRouter);
app.use("/chapters", verifyToken, chapterRouter);
app.use("/lessons", verifyToken, lessonRouter);
app.use("/image-courses", verifyToken, imageCoursesRouter);
app.use("/my-courses", verifyToken, myCoursesRouter);
app.use("/reviews", verifyToken, reviewsRouter);
app.use("/media", mediaRouter);
app.use("/orders", orderRouter);
app.use("/payments", paymentRouter);
app.use("/refresh-tokens", refreshTokenRouter);
app.use("/mentors", verifyToken, mentortRouter);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
