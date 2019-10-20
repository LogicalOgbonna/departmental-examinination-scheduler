const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("admin");
const Lecturer = mongoose.model("lecturer");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.lecturer) {
        Lecturer.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      } else {
        User.findById(jwt_payload.id)
          .then(user => {
            if (user) {
              return done(null, user);
            }
            return done(null, false);
          })
          .catch(err => console.log(err));
      }
    })
  );
};
