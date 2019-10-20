const router = require("express").Router();
const Halls = require("../../models/Halls");
const Lecturers = require("../../models/Lecturer");

router.post("/", (req, res, next) => {
  Halls.findOne({ name: req.body.name }).then(course => {
    if (course && Object.keys(course).length) {
      res.json({
        course: `Hall with Name ${req.body.name} already exist`
      });
    } else {
      const course = {
        name: req.body.name,
        numberOfStudents: req.body.number
      };
      const newCourse = new Halls(course);
      newCourse
        .save()
        .then(data => res.json(data))
        .catch(err => res.json(err));
    }
  });
});

router.get("/", (req, res, next) => {
  Halls.find({}).then(halls => {
    if (halls.length) {
      return res.json(halls);
    } else {
      return res.json([]);
    }
  });
});

router.get("/:id", (req, res, next) => {
  Halls.findById(req.params.id).then(hall => {
    if (Object.keys(hall).length) {
      return res.json(hall);
    } else {
      return res.json({ hall: `No hall with ID ${req.params.id} found` });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Halls.findByIdAndDelete(req.params.id)
    .then(data => {
      // Lecturers.find().then(lecturers => {
      //   lecturers.courses.fileter(course => course.id !== req.body.id);
      // });
      res.json(data);
    })
    .catch(err => res.json(err));
});
module.exports = router;
