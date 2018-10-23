require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const questionRouter = require('./routes/questionRouter.js');
const answerRouter = require('./routes/answerRouter.js');

mongoose.connect('mongodb://localhost/hacktivoverflow', {useNewUrlParser: true});

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/qustions', questionRouter);
app.use('/answers', answerRouter);

app.listen(port, function() {
    console.log('Listening on port', port);
});

module.exports = app;