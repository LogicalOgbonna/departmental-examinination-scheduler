const Courses = require("../../models/Courses");
const Lecturers = require("../../models/Lecturer");
const Settings = require("../../models/Settings");

module.exports = {
  getCourses: () =>
    Courses.find({})
      .then(courses => {
        return courses;
      })
      .catch(err => err),
  getSettings: () =>
    Settings.find({})
      .then(settings => {
        return settings;
      })
      .catch(err => err),
  getLecturers: () =>
    Lecturers.find({})
      .then(lecturers => {
        return lecturers;
      })
      .catch(err => err),
  getLecturerOfCourse: lecturers => {
    const lecturerOfCourse = [];
    for (let i = 0; i < lecturers.length; i++) {
      lecturers[i].courses.map(course => {
        lecturerOfCourse.push({
          _id: course._id,
          code: course.code,
          title: course.title,
          numberOfStudents: course.numberOfStudents,
          lecturer: [lecturers[i].name]
        });
      });
    }
    const allLecturersName = lecturers.map(lecturer => lecturer.name);
    return { lecturerOfCourse, allLecturersName };
  },
  getInvigilators: (lecturerOfCourse, setting, allLecturersName) => {
    var invigilatorsWithCourse = lecturerOfCourse;
    for (let i = 0; i < invigilatorsWithCourse.length; i++) {
      let numOfLecToInvigilate = Math.floor(
        (invigilatorsWithCourse[i].numberOfStudents *
          setting[0].numberOfLectures) /
          setting[0].numberOfStudents
      );
      if (numOfLecToInvigilate < 1) numOfLecToInvigilate = 1;
      invigilatorsWithCourse[i].numOfLecToInvigilate = numOfLecToInvigilate;
      for (var j = 1; j < numOfLecToInvigilate; j++) {
        // console.log()
        var randomElement =
          allLecturersName[Math.floor(Math.random() * allLecturersName.length)];
        if (randomElement) {
          invigilatorsWithCourse[i].lecturer.push(randomElement);
        } else {
          invigilatorsWithCourse[i].lecturer.push(randomElement);
          // lecturerOfCourse.lecturer.push(randomElement);
        }
      }
    }
    return invigilatorsWithCourse;
  },
  unique: (array, code) => {
    // console.log(array);
    const invigilator = { lecturer: [] };
    for (let i = 0; i < array.length; i++) {
      if (array[i].code === code) {
        invigilator._id = array[i]._id;
        invigilator.code = array[i].code;
        invigilator.title = array[i].title;
        // invigilator.
        // invigilator.
        // console.log();
      }
    }
    return invigilator;
  }
};
