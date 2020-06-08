const authFilter = require('../middleware/authenticate-filter');
var authRoutes = (application, passport) => {
	application.get('/', (req, res) => {
		res.send('This is my first route');
	});
	application.get(
		'/auth/response',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/currentuser');
		}
	);
	application.get(
		'/login',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		}),
		(req, res) => {}
	);
	application.get('/currentuser', authFilter, (req, res) => {
		res.send(req.user);
	});
	application.get('/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
};
module.exports = authRoutes;
