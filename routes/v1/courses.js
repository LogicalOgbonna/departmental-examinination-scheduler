const router = require("express").Router();
const Courses = require("../../models/Courses");

router.post("/", (req, res, next) => {
  // res.json(req.body);
  Courses.find({}).then(course => {
    if (course.length > 0) {
      // req.body.map(data => {
      //   Courses.course.push({ code: data.code, title: data.title });
      // });

      console.log(Courses.collection);

      res.json({ data: Courses.model("course").courses });
      // return Courses.save()
      //   .then(data => res.json(data))
      //   .catch(error =>
      //     res.statusCode(401).json({ massage: "an error occured", error })
      //   );
    } else {
      const newCourse = new Courses();
      req.body.map(data => {
        newCourse.courses.push({ code: data.code, title: data.title });
      });
      newCourse
        .save()
        .then(data => res.json(data))
        .catch(error =>
          res.statusCode(401).json({ message: "An error occured", error })
        );
    }
  });
  // res.json("Working");
});

module.exports = router;
