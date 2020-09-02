const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const ngrok = require('ngrok');
require('dotenv/config');

app.use(express.json());
mongoose.set('runValidators', true);

//Router
const routes = require('./controllers/router');
app.use('/',routes);

app.use(multer({
	dest: './uploads/',
	rename: (fieldname,filename) => {
		return filename;
	},
}).single('photo'));


//Database Connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
	console.log('Connected to Database!')
);


//Server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));

(async () => {
	const url = await ngrok.connect(port);
	console.log(`Hosting on url ${url}`);
})();