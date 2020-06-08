const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	userId: String,
	userName: String,
});
mongoose.model('user', userSchema);