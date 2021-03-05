const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var dotenv = require('dotenv');

dotenv.config()
app.use(bodyParser.json());

//---------------------------------Database connection---------------------------------
mongoose.connect(
    process.env.DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        console.log('database Working!')
    });

//---------------------------------Routes-------------------------------- 

const userRoute = require('./routes/user');
const questionRoute = require('./routes/question');
const quiz = require('./routes/quiz');

app.use('/users', userRoute)
app.use('/question', questionRoute)
app.use('/quiz', quiz);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})