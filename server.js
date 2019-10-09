// IMPORTS
const express = require('express');
const connectDB = require('./config/db');

// IMPORTES ROUTES
const user = require('./routes/api/user');

// CREATE express app
const app = express();
connectDB();

app.use(express.json({ extented: false }));

// DEFINE routes
app.use('/api/user', user);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Express Back End Server Started');
});
