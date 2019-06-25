const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

const handlePayloadUser = done => (user) => {
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

const createStrategy = (useCases, options) => new Strategy(
  options,
  (payload, done) => useCases.accounts.getUserById(payload.id)
    .then(handlePayloadUser(done)).catch(err => done(err, null)),
);

module.exports = {
  initialize(useCases) {
    const strategyOptions = {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    passport.use(createStrategy(useCases, strategyOptions));

    return passport.initialize();
  },
  authenticate() {
    return passport.authenticate('jwt', { session: false });
  },
};
