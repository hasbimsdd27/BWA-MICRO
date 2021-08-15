const express = require("express");
const logger = require("morgan");
const { onError, onListening } = require("./utils/debug");

const MentorController = require("./routes/mentorRouter");

//initial express
const PORT = process.env.PORT || 4002;
const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/mentors", MentorController);

app.listen(PORT, () => {
  console.log(`App running in port ${PORT}`);
});
app.on("error", onError);
app.on("listening", onListening);
