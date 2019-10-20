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
const settingsRoute = require("./routes/v1/settings");
const complaintsRoute = require("./routes/v1/complaints");
const hallsRoute = require("./routes/v1/halls");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

dotenv.config();
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/user", userRoute);
app.use("/api/lecturers", lecturerRoute);
app.use("/api/courses", coursesRoute);
app.use("/api/scheduler", schedulerRoute);
app.use("/api/settings", settingsRoute);
app.use("/api/halls", hallsRoute);
app.use("/api/complaints", complaintsRoute);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true }).then(() => {
  User.find({ email: "admin@example.com" }).then(user => {
    if (!user.length) {
      const user = new User({
        admin: true,
        name: "admin",
        email: "admin@example.com",
        password: "admin-secret",
        avatar:
          "//www.gravatar.com/avatar/f620f4647fb816073c9152a284245e64?s=200&r=pg&d=mm"
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then(() => {
              app.listen(port, () =>
                console.log("App Running on Port " + port)
              );
              console.log("Admin Created");
            })
            .catch(err => console.log(err));
        });
      });
    } else {
      app.listen(port, () => console.log("App Running on Port " + port));
    }
  });
});
