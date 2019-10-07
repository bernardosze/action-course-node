// IMPORTS
const express = require('express');

// IMPORTES ROUTES
const route = require('./routes/api/route');

// CREATE express app
const app = express();

app.use(express.json({ extented: false }));

// DEFINE routes
app.use('/api/route', route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Express Back End Server Started');
});
