const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");

const MentorRouter = require("./routes/mentorRouter");
const CourseRouter = require("./routes/courseRouter");
const ChapterRouter = require("./routes/chapterRouter");
const LessonRouter = require("./routes/lessonRouter");
const ImageCourseRouter = require("./routes/imageRouter");
const ReviewRouter = require("./routes/reviewRouter");
const myCourseRouter = require("./routes/myCourseRoute");

//initial express
const PORT = process.env.PORT || 4002;
const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/mentors", MentorRouter);
app.use("/courses", CourseRouter);
app.use("/chapters", ChapterRouter);
app.use("/lessons", LessonRouter);
app.use("/image-courses", ImageCourseRouter);
app.use("/reviews", ReviewRouter);
app.use("/my-courses", myCourseRouter);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
