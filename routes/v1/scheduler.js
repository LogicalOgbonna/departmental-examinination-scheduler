const router = require("express").Router();
const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");

router.post("/", (req, res, next) => {
  Courses.find({}).then(courses => {
    Lecturers.find({}).then(lecturers => {
      const numOfCourses = courses.length;
      const numOfLecturers = lecturers.length;

      res.json({ courses, lecturers });
    });
  });
});

module.exports = router;
