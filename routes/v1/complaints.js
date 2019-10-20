const router = require("express").Router();
const Complaints = require("../../models/Complaints");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const newComplaint = new Complaints({
      message: req.body.message,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
      },
      userID: req.user._id,
      reason: req.body.reason
    });

    newComplaint
      .save()
      .then(complain => res.json(complain))
      .catch(err => res.status(400).json(err));
  }
);

//Start Conversation
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Complaints.findById(req.params.id).then(complain => {
      if (complain === null) {
        return res.status(400).json("Complaint Deleted");
      }
      complain.conversation.push({
        message: req.body.response,
        admin: req.user.admin ? req.user.admin : false
      });
      complain
        .save()
        .then(reply => res.json(reply))
        .catch(err => res.status(400).json(err));
    });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.admin) {
      return Complaints.find()
        .then(complaints => res.json(complaints))
        .catch(err => res.status(400).json(err));
    } else {
      return Complaints.find({ userID: req.user._id })
        .then(complaints => res.json(complaints))
        .catch(err => res.status(400).json(err));
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Complaints.findByIdAndDelete(req.params.id)
      .then(complain => res.json(complain))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
