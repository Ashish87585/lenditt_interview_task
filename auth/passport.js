const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require("../db/database");

passport.use(
    new StrategyJwt({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    function(jwtPayload, done) {
        return db.users.findOne({
            where: {
                id: jwtPayload.id
            }
        }).then((user) => {
            console.log("user", user);
            return done(null, user);
        }).catch((err) => {
            return done(err)
        })
    })
)
