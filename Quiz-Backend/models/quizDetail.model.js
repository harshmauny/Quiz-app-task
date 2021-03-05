const mongoose = require('mongoose');

const QuizDetail = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, required: true },
    quizID: { type: String, required: true },
    quizInfo: { type: Object, required: true },
    score: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now }
})

module.export = mongoose.model("quiz", QuizDetail);