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
	 <br/> 2. GET /api/products/${name} to retrieve a specific products\
	 <br/> 2. GET /api/products/allfields to retrieve all fields for every product\
	 <br/> 3. POST /api/products to add a new products\
	 <br/> 4. PUT /api/products/${name} to update a products\
	 <br/> 5. DELETE /api/products/${name} to delete a products');
});


//GET all products
router.get('/api/products/allfields', async (req,res) => {

	try{
		const products = await Product.find();
		res.status(200).json(products);
	} catch(err) {
		res.status(400).json({message: err});
	}
});


//GET all products
router.get('/api/products/', async (req,res) => {

	try{
		const products = await Product.aggregate([							
				{	
					"$project": {
						name: 1,
						price: 1,
						_id: 0,																							
						avgRating: {$avg: "$reviews.rating"}
					}
				}			
		]);
		res.status(200).json(products);
	} catch(err) {
		res.status(400).json({message: err});
	}

});


//GET specific product
router.get('/api/products/:name', async (req,res) => {

	try{
		const product = await Product.aggregate([				
				{
					$match: {name: req.params.name},					
				},						
				{
					"$project": {
						name: 1,
						price: 1,
						image: 1,
						reviews: 1,											
						avgRating: {$avg: "$reviews.rating"}
					}
				}
			]);		
		res.status(200).json(product);
	} catch(err) {				
		res.status(404).send('404 Product not found');
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


//DELETE delete product
router.delete('/api/products/:name', async (req,res) => {

	try{
		const products = await Product.remove({name: req.params.name});
		res.status(200).json(products);
	} catch(err) {
		res.status(400).json({message: err});
	}
});


//PUT update product
router.put('/api/products/:name', async (req,res) => {

	try{
		const products = await Product.updateOne(
				{name: req.params.name},
				{ 
					$set: {
						name: req.body.name,
						description: req.body.description,		
						image: {
							data: fs.readFileSync(path.join(__dirname, '../uploads/' + req.body.image)),
							contentType: 'image/png'
						},
						price: req.body.price,
						reviews: req.body.reviews	
					}
				}
			);
		res.status(200).json(products);
	} catch(err) {
		res.status(400).json({message: err});
	}
});


module.exports = router;

//Thank you, our lord and saviour POSTMAN Rest client