const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const path = require("path");

const userRoute = require("./routes/v1/user");
const coursesRoute = require("./routes/v1/courses");
const lecturerRoute = require("./routes/v1/lecturer");
const schedulerRoute = require("./routes/v1/scheduler");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/user", userRoute);
app.use("/api/lecturers", lecturerRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/scheduler", schedulerRoute);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 7000;

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true }).then(() => {
  console.log("DB Connected successfully");
  app.listen(port, () => console.log("App Running on Port " + port));
});
