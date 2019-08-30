const router = require("express").Router();
const helper = require("./helper");

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
  let courses = [];
  let settings = [];
  let lecturers = [];
  async function getFromDB() {
    courses = await helper.getCourses();
    settings = await helper.getSettings();
    lecturers = await helper.getLecturers();
    // console.log(courses);
    if (courses.length) {
      if (lecturers.length) {
        const {
          lecturerOfCourse,
          allLecturersName
        } = helper.getLecturerOfCourse(lecturers);
        const invigilators = helper.getInvigilators(
          lecturerOfCourse,
          settings,
          allLecturersName
        );
        let unique = [];
        for (let i = 0; i < invigilators.length; i++) {
          unique.push(helper.unique(invigilators, invigilators[i].code));
        }
        res.json({ invigilators });
      } else {
        return res.json({
          lecturer:
            "No Lecturer was assigned to a course, please assign lecturer to course"
        });
      }
    } else {
      return res.json({
        lecturer: "No Lecturer TO Invigilate Exams, please register lecturers"
      });
    }
  }
  getFromDB();
});

module.exports = router;
