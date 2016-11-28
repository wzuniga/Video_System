var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	token: String,
	photo: String,
	createdOn: Date
});

var userPublicSchema = new mongoose.Schema({
	name: String,
	photo: String
});

var commentSchema = new mongoose.Schema({
	user: {
		type: userPublicSchema,
		required: true
	},
	comment: String,
	createdOn: Date
});

var categorySchema = new mongoose.Schema({
	name: String,
	description: String
});

var videoSchema = new mongoose.Schema({
	name: {type: String, required: true},
	description: String,
	createdOn: {
        type: Date,
        "default": Date.now
    },
    user: userPublicSchema,
    category: categorySchema,
    comments: [commentSchema]
});

mongoose.model('User', userSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Category', categorySchema);
mongoose.model('Video', videoSchema);
