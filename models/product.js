const mongoose = require('mongoose');

const Product = mongoose.Schema({	
	name: {
		type: String,
		required: [true, 'Product name is required']
	},
	description: {
		type: String,
		required: [true, 'Product description is required']
	},
	image: {
		data: Buffer,
		contentType: String
	},
	price: {
		type: Number,
		required: [true, 'Price is required']
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