// IMPORTS
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// CREATE express app
const app = express();
app.use(cors());
connectDB();

app.use(express.json({ extented: false }));

// DEFINE routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/project', require('./routes/api/project'));

// APP PORT & LISTEN
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('Express Back End Server Started');
});
