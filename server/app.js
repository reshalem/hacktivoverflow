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
const cron = require('./helpers/cron');

mongoose.connect('mongodb://localhost/hacktivoverflow', {useNewUrlParser: true});

// var mongodbUri = `mongodb://${process.env.MLAB_USER}:${process.env.MLAB_PASSWORD}@ds147274.mlab.com:47274/hacktivxoverflow`;
// mongoose.connect(mongodbUri, {
//     useNewUrlParser: true
// });

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/questions', questionRouter);
app.use('/answers', answerRouter);

app.listen(port, cron, function() {
    console.log('Listening on port', port);
});

module.exports = app;