const router = require("express").Router();
const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");

router.post("/", (req, res, next) => {
  Lecturers.findOne({ name: req.body.name }).then(lecturer => {
    if (lecturer && Object.keys(lecturer).length) {
      Courses.findOne({ code: req.body.courses.code }).then(course => {
        if (course === null || course === undefined) {
          res.json({
            course: `The Course with Code ${
              req.body.courses.code
            } have not been registered`
          });
        } else {
          const courseCode = [];
          if (lecturer.courses.length) {
            lecturer.courses.map(course => courseCode.push(course.code));
          }
          if (!courseCode.includes(req.body.courses.code)) {
            console.log(course);
            lecturer.courses.push({
              code: course.code,
              title: course.title,
              numberOfStudents: course.numberOfStudents
            });
            lecturer
              .save()
              .then(data => res.json(data))
              .catch(err => res.json(err));
          } else {
            res.json({
              message: "This course have already been asigned to this lecturer"
            });
          }
        }
      });
    } else {
      Courses.findOne({ code: req.body.courses.code }).then(course => {
        if (course === null || course === undefined) {
          res.json({
            course: `The Course with Code ${
              req.body.courses.code
            } have not been registered`
          });
        } else {
          const lecturer = {
            name: req.body.name,
            courses: [
              {
                code: course.code,
                title: course.title,
                numberOfStudents: course.numberOfStudents
              }
            ]
          };

          const newLecturer = new Lecturers(lecturer);
          newLecturer.save().then(data => res.json(data));
        }
      });
    }
  });
});

router.get("/", (req, res, next) => {
  Lecturers.find({})
    .then(lecturers => {
      if (lecturers.length) {
        return res.json(lecturers);
      } else {
        return res.json({ lecturers: "No Lecturer Found" });
      }
    })
    .catch(err => res.json(err));
});

router.delete("/", (req, res, next) => {
  Lecturers.findByIdAndDelete(req.body.id).then(lecturer => {
    res.json(lecturer);
  });
});

module.exports = router;
