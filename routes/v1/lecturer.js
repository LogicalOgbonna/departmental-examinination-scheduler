const router = require("express").Router();
const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");

router.post("/", (req, res, next) => {
  Lecturers.findOne({ name: req.body.name }).then(lecturer => {
    if (lecturer && Object.keys(lecturer).length) {
      Courses.findOne({ code: req.body.code }).then(course => {
        if (course === null || course === undefined) {
          res.json({
            course: `The Course with Code ${
              req.body.code
            } have not been registered`
          });
        } else {
          const courseCode = [];
          if (lecturer.courses.length) {
            lecturer.courses.map(course => courseCode.push(course.code));
          }
          if (!courseCode.includes(req.body.code)) {
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
      Courses.findOne({ code: req.body.code }).then(course => {
        if (course === null || course === undefined) {
          res.json({
            course: `The Course with Code ${
              req.body.code
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
        return res.json([]);
      }
    })
    .catch(err => res.json(err));
});

router.get("/:id", (req, res, next) => {
  Lecturers.findById(req.params.id)
    .then(lecturer => {
      if (Object.keys(lecturer).length) {
        return res.json(lecturer);
      } else {
        return res.json({ lecturer: "No Lecturer Found" });
      }
    })
    .catch(err => res.json(err));
});

router.post("/deleteCourse", (req, res, next) => {
  Lecturers.findById(req.body.lec_id).then(lecturer => {
    lecturer.courses = lecturer.courses.filter(
      course => course.code !== req.body.cos_id
    );
    lecturer.save().then(saved => res.json(saved));
  });
});

router.delete("/:id", (req, res, next) => {
  Lecturers.findByIdAndDelete(req.params.id).then(lecturer => {
    res.json(lecturer);
  });
});

module.exports = router;
