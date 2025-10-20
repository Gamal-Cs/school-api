const express = require('express');
const errorHandling = require('./middlewares/errorHandling');
const app = express();
const {authRouter} = require('./routes/auth.routes');

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/auth', authRouter);

app.use(errorHandling());

module.exports = {app};