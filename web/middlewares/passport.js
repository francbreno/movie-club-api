const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const handlePayloadUser = done => (user) => {
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

const createStrategy = (contexts, options) => new Strategy(
  options,
  (payload, done) => contexts.Accounts.getUserById(payload.id)
    .then((handlePayloadUser(done)).catch(err => done(err, null))),
);

module.exports = {
  initialize(contexts) {
    const strategyOptions = {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    passport.use(createStrategy(contexts, strategyOptions));

    return passport.initialize();
  },
  authenticate() {
    return passport.authenticate('jwt', { session: false });
  },
};
