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

  // Courses.find({}).then(courses => {
  //   Lecturers.find({}).then(lecturers => {
  //     if (lecturers.length) {
  //       const lecturerOfCourse = [];
  //       const allLecturersName = lecturers.map(lecturer => lecturer.name);
  //       for (let i = 0; i < lecturers.length; i++) {
  //         lecturers[i].courses.map(course => {
  //           lecturerOfCourse.push({
  //             _id: course._id,
  //             code: course.code,
  //             title: course.title,
  //             numberOfStudents: course.numberOfStudents,
  //             lecturer: [lecturers[i].name]
  //           });
  //         });
  //       }
  //       if (lecturerOfCourse.length) {
  //         Settings.findOne({}).then(setting => {
  //           var invigilators = [];
  //           for (let i = 0; i < lecturerOfCourse.length; i++) {
  //             let numOfLecToInvigilate = Math.floor(
  //               (lecturerOfCourse[i].numberOfStudents *
  //                 setting.numberOfLectures) /
  //                 setting.numberOfStudents
  //             );
  //             for (var j = 0; j < numOfLecToInvigilate; j++) {
  //               var randomElement =
  //                 allLecturersName[
  //                   Math.floor(Math.random() * allLecturersName.length)
  //                 ];
  //               if (randomElement) {
  //                 lecturerOfCourse[i].lecturer.push(randomElement);
  //               } else {
  //                 lecturerOfCourse[i].lecturer.push(randomElement);

  //                 // lecturerOfCourse.lecturer.push(randomElement);
  //               }
  //             }
  //           }
  //           // console.log(invigilators);
  //           // if (
  //           //   !invigilators.includes(
  //           //     lecturerOfCourse.map(cours => cours.lecturer)[0]
  //           //   )
  //           // ) {
  //           //   invigilators.push(
  //           //     lecturerOfCourse.map(cours => cours.lecturer)[0]
  //           //   );
  //           // }
  //           var invigilatorsUnique = lecturerOfCourse
  //             .map(course => course.lecturer)
  //             .filter((item, index) => {
  //               return lecturerOfCourse.indexOf(item) >= index;
  //             });

  //           // const invigilatorsUnique = invigilators.reduce((acc, current) => {
  //           //   const x = acc.find(item => item.course === current.course);
  //           //   if (!x) {
  //           //     return acc.concat([current]);
  //           //   } else {
  //           //     return acc;
  //           //   }
  //           // }, []);

  //           // const invigilatorsUnique = Array.from(
  //           //   new Set(invigilators.map(a => a.course))
  //           // ).map(id => {
  //           //   // console.log(id);
  //           //   return invigilators.find(a => a.course === id);
  //           // });
  //           res.json({
  //             lecturerOfCourse,
  //             invigilatorsUnique
  //             // invigilators
  //           });
  //         });
  //       } else {
  //         return res.json({
  //           lecturer:
  //             "No Lecturer was assigned to a course, please assign lecturer to course"
  //         });
  //       }
  //     } else {
  //       return res.json({
  //         lecturer: "No Lecturer TO Invigilate Exams, please register lecturers"
  //       });
  //     }
  //   });
  // });
});

module.exports = router;
