const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const { User } = require("../models/User"); 
const jwtSecret = "jwt"; 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = {
  initialize: passport.initialize(),
  authenticate: passport.authenticate("jwt", { session: false }),
};
