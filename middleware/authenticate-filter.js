var IsAuthorized = function (req, res, next) {
	if (req.user) {
		next();
	}
    res.statusCode = '401';
    res.send("Invalid User");
};
module.exports = IsAuthorized;