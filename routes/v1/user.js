const router = require("express").Router();
const Courses = require("../../models/Courses");

router.post("/login", (req, res, next) => {
  Courses.find({}).then(data => res.json(data));
  // res.json("Working");
});

module.exports = router;
