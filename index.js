const passport = require('passport');
const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const application = express();
const authRoute = require('./routes/auth-route');

require('./models/user');

require('./services/passport');

application.use(
	cookieSession({
		maxAge: 1 * 1000,
		keys: ['32143243ade4324324'],
	})
);

application.use(passport.initialize());
application.use(passport.session());
authRoute(application, passport);

mongoose.connect("mongodb+srv://nikesh:nikesh@cluster0-icocy.azure.mongodb.net/node-tutorial?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

application.listen(8000, function () {
	console.log('Listning through 8000');
});
