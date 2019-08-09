const router = require("express").Router();
const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");

router.post("/", (req, res, next) => {
  Courses.findOne({ code: req.body.code }).then(course => {
    if (course && Object.keys(course).length) {
      res.json({
        course: `Coures with Course Code ${req.body.code} already exist`
      });
    } else {
      const course = {
        code: req.body.code,
        title: req.body.title,
        numberOfStudents: req.body.number
      };
      const newCourse = new Courses(course);
      newCourse
        .save()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
  });
});

router.get("/", (req, res, next) => {
  Courses.find({}).then(courses => {
    if (courses.length) {
      return res.json(courses);
    } else {
      return res.json({ courses: "No Lecturer Found" });
    }
  });
});

router.delete("/", (req, res, next) => {
  console.log(req.body.id);
  Courses.findByIdAndDelete(req.body.id).then(data => {
    for (i = 0; i < data.lecturer.length; i++) {
      Lecturers.find().then(lecturers => {
        lecturers.courses.fileter(course => course.id !== req.body.id);
      });
    }

    res.json(data);
  });
});
module.exports = router;
