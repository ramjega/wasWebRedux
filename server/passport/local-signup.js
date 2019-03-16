const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim(),
        userType: req.body.userType,
        mobileNumber:  req.body.mobileNumber,
        address:  req.body.address
    };

    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) {
            return done(err);
        }

        return done(null);
    });
});
