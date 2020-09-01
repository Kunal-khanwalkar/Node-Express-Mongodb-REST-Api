const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');


//Routes

//GET home
router.get('/', (req,res) => {
	res.send('Welcome! Please use the following routes for the desired operations. <br/>\
	 <br/> 1. GET /api/products to retrieve all products\
	 <br/> 2. GET /api/products/${id} to retrieve a specific products\
	 <br/> 3. POST /api/products to add a new products\
	 <br/> 4. PUT /api/products/{id} to update a products\
	 <br/> 5. DELETE /api/products/{id} to delete a products');
});


//GET all products
router.get('/api/products', async (req,res) => {

	try{
		const products = await Product.find();
		res.status(200).json(products);
	} catch(err) {
		res.status(400).json({message: err});
	}
});


//POST add product
router.post('/api/products', async (req,res) => {

	const product = new Product({
		name: req.body.name,
		description: req.body.description,		
		image: {
			data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.body.image)),
			contentType: 'image/png'
		},
		price: req.body.price,
		reviews: req.body.reviews		
	});

	try{
		const savedProduct = await product.save();
		res.status(200).json(savedProduct);
	} catch(err) {
		res.status(400).json({message: err});
	}

});


module.exports = router;