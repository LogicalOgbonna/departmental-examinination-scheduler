const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");
const jwt = require("jsonwebtoken");
const validation = require("../../validation/general-validation");

router.post("/", (req, res, next) => {
  Lecturers.findOne({ email: req.body.email }).then(lecturer => {
    if (lecturer && Object.keys(lecturer).length) {
      Courses.findOne({ code: req.body.code }).then(course => {
        if (course === null || course === undefined) {
          res.json({
            course: `The Course with Code ${req.body.code} have not been registered`
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
            course: `The Course with Code ${req.body.code} have not been registered`
          });
        } else {
          const lecturer = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            courses: [
              {
                code: course.code,
                title: course.title,
                numberOfStudents: course.numberOfStudents
              }
            ]
          };

          const newLecturer = new Lecturers(lecturer);
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err;
              newLecturer.password = hash;
              newLecturer
                .save()
                .then(user => {
                  const payload = {
                    id: user.id,
                    lecturer: true
                  };
                  jwt.sign(payload, process.env.secretOrKey, (err, token) => {
                    res.json({
                      success: "User created sucessfully",
                      token: "Bearer " + token
                    });
                  });
                })
                .catch(err => res.json(err));
            });
          });
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

router.post("/login", (req, res, next) => {
  const { errors, isValid } = validation.login(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  Lecturers.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "email or password not correct";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {
          id: user.id,
          lecturer: true
        }; // Create JWT Payload

        // Sign Token
        jwt.sign(payload, process.env.secretOrKey, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "email or password not correct";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
