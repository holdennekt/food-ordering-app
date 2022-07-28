const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcryptjs");
const { adminsProvider } = require("./providers");

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await adminsProvider.getOneByName(username);
  if (!user) return done(null, null, { message: `no such admin: ${username}` });
  try {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) return done(null, user);
    return done(null, null, {
      message: `wrong password for admin ${username}`,
    });
  } catch (e) {
    return done(e);
  }
});

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const jwtStrategy = new JwtStrategy(
  jwtStrategyOptions,
  async (payload, done) => {
    const user = await adminsProvider.getOneById(payload.id);
    if (!user) return done(null, null, { message: "unauthorised" });
    return done(null, user);
  }
);

const initPassport = (passport) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
  const localAuth = passport.authenticate("local", { session: false });
  const jwtAuth = passport.authenticate("jwt", { session: false });
  return { localAuth, jwtAuth };
};

module.exports = { initPassport };
