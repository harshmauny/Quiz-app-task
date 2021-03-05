const router = require('express').Router();
const mongoose = require('mongoose');

const QuestionSet = require('../models/questionSet.model');

// @route GET api/question
// @desc get questions
// @access 
router.get('/', (req, res, next) => {
    QuestionSet.find()
        .then(question => {
            console.log(question)
            return res.status(200).json({
                questions: question
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// @route POST api/question/add
// @desc add new question
// @access 
router.post('/add', (req, res, next) => {
    const questionText = req.body.question
    const answerOptions = req.body.options
    const newQuestion = new QuestionSet({
        _id: new mongoose.Types.ObjectId(),
        questionText: questionText,
        answerOptions: answerOptions
    })
    newQuestion.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Question Added"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router;