const localStrategy = require('passport-local').Strategy;
const user = require('./schema/User');
const jwt = require('jsonwebtoken')

module.exports = async function initialize(passport) {
    var userData 
    const authenticateUser = async (email, password, done) => {
         userData = await user.findOne({
            email: email
        });
        if (userData == null || userData == 'undefined') {
            return done(null, false, {
                massage: "No user Found with this Email"
            })
        }

        try {
            let decodedPassword = await jwt.decode(userData.password);
            if (password.toString() === decodedPassword.password) {
                return done(null, userData)
            } else {
                return done(null, false, {
                    massage: 'Incorrect Password'
                })
            }
        } catch (error) {
            return done(error)
        }

    }
    passport.use(new localStrategy({
        usernameField: "email",
        passwordField: 'password'
    }, authenticateUser));
    passport.serializeUser((userData, done) => {
        done(null, userData.email)
    })
    passport.deserializeUser((id, done) => {
        return done(null,
            userData)

    })
}