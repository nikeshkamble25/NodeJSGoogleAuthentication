const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('user');

passport.serializeUser(({ id }, done) => {
	done(null, id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((existingUser) => {
		done(null, existingUser);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID:
				'353490325350-23usoqj788j4m6npnsqjun2pgk44s716.apps.googleusercontent.com',
			clientSecret: 'tFvEiMrDGGl1bOGmMT4vlX7w',
			callbackURL: 'http://localhost:8000/auth/response',
		},
		async (token, tokenSecret, profile, done) => {
			const existingUser = await User.findOne({userId:profile.id});
			if(existingUser){
				done(null, existingUser);
				return;
			}
			new User({
				userId: profile.id,
				userName: profile.displayName,
			})
				.save()
				.then((user) => {
					done(null, user);
				});
		}
	)
);
