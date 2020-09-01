const mongoose = require('mongoose');

const Product = mongoose.Schema({	
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	},
	price: {
		type: Number,
		required: true
	},
	reviews: [
		{
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				min: 1,
				max: 5,
				required: true
			},
			comment: {
				type: String,
				required: true
			}
		}
	]
});


module.exports = mongoose.model('Product',Product);