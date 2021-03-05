const router = require('express').Router();
const mongoose = require('mongoose');

const Quiz = require('../models/quizDetail.model');

// @route GET api/quiz
// @desc get quiz details/history
// @access
router.get('/', (req, res, next) => {
    Quiz.find()
        .then(quiz => {
            console.log(quiz)
            return res.status(200).json({
                quiz: quiz
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                error: err
            })
        })
})

// @route POST api/quiz/add
// @desc add quiz data
// @access
router.post('/add', (req, res, next) => {
    const newQuiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        quizID: req.body.quizID,
        quizData: req.body.quizData,
        score: req.body.score,
    })
    newQuiz.save()
        .then(result => {
            res.status(200).json({
                message: "Quiz Data Added"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

// @route POST api/quiz/:userID
// @desc Quiz history from UserID
// @access
router.get('/:userID', (req, res, next) => {
    const UserId = req.params.userID
    Quiz.find({ UserId })
        .then(result => {
            res.status(200).json({
                quiz: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router;