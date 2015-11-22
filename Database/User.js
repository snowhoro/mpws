module.exports = function(mongoose){
	var Schema =	mongoose.Schema;
	var UserSchema = new Schema({
		email: { type: String, unique: true, },
		password: String,
		name: String,
		lname: String,
		isActive: {type: Boolean, default: false}
	});

	return mongoose.model('User', UserSchema);
};