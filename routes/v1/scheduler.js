const router = require("express").Router();
const helper = require("./helper");
const Schedule = require("../../models/Schedule");

router.get("/", (req, res, next) => {
  async function getFromDB() {
    courses = await helper.getCourses();
    settings = await helper.getSettings();
    lecturers = await helper.getLecturers();

    res.json({
      courses: courses.length,
      lecturers: lecturers.length,
      settings
    });
  }

  getFromDB();
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  const timeTable = {
    lecturers: [],
    courses: [],
    halls: [],
    session: req.body.session
  };
  req.body.timeTable.map((doc, i) => {
    console.log(i);
    // console.log(doc.courses[i]);
    // timeTable.date = doc.date;
    // timeTable.halls.push(doc.halls[i]);
    // timeTable.lecturers.push(doc.lecturers[i]);
    // timeTable.courses.push(doc.courses[i]);

    // doc.lecturers.map(lecturer => {
    //   timeTable.lecturers.push({
    //     name: lecturer.name,
    //     email: lecturer.email
    //   });
    // });
    // doc.courses.map(course => {
    //   timeTable.courses.push({
    //     code: course.code,
    //     title: course.title,
    //     numberOfStudents: course.numberOfStudents
    //   });
    // });

    // doc.halls.map(hall => {
    //   timeTable.halls.push({
    //     name: hall.name,
    //     numberOfStudents: hall.numberOfStudents
    //   });
    // });
  });
  // req.body.timeTable.map(doc => {
  //   doc.courses.map
  //   timeTable.courses.push({
  //     code: course.code,
  //     titile: course.titile,
  //     numberOfStudents: course.numberOfStudents
  //   });
  // });
  // req.body.timeTable.halls.map(hall => {
  //   timeTable.halls.push({
  //     name: hall.name,
  //     numberOfStudents: hall.numberOfStudents
  //   });
  // });

  const newSchedule = new Schedule(timeTable);
  newSchedule
    .save()
    .then(doc => {
      res.json(doc);
    })
    .catch(err => res.status(400).json(err));
  // let courses = [];
  // let settings = [];
  // let lecturers = [];
  // async function getFromDB() {
  //   courses = await helper.getCourses();
  //   settings = await helper.getSettings();
  //   lecturers = await helper.getLecturers();
  //   // console.log(courses);
  //   if (courses.length) {
  //     if (lecturers.length) {
  //       const {
  //         lecturerOfCourse,
  //         allLecturersName
  //       } = helper.getLecturerOfCourse(lecturers);
  //       const invigilators = helper.getInvigilators(
  //         lecturerOfCourse,
  //         settings,
  //         allLecturersName
  //       );
  //       let unique = [];
  //       for (let i = 0; i < invigilators.length; i++) {
  //         unique.push(helper.unique(invigilators, invigilators[i].code));
  //       }
  //       res.json({ invigilators });
  //     } else {
  //       return res.json({
  //         lecturer:
  //           "No Lecturer was assigned to a course, please assign lecturer to course"
  //       });
  //     }
  //   } else {
  //     return res.json({
  //       lecturer: "No Lecturer TO Invigilate Exams, please register lecturers"
  //     });
  //   }
  // }
  // getFromDB();
});

module.exports = router;
