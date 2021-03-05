const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let User = require('../models/users.model');


// @route GET api/users
// @desc get user info
// @access Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route POST api/users/register
// @desc regster new user
// @access Public
router.post('/register', (req, res, next) => {
    const mobile = req.body.mobile
    const email = req.body.email
    const password = req.body.password
    User.find({ mobile })
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User found!'
                });
            } else {
                bcrypt.hash(password, 10, (err, hashPassword) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            mobile: req.body.mobile,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            gender: req.body.gender,
                            dob: req.body.dob,
                            email: email,
                            password: hashPassword,
                            country: req.body.country,
                            state: req.body.state,
                            city: req.body.city,
                            hobbies: req.body.hobbies,
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: 'New User created!',
                                    user_data: result,
                                    auth: true
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        })
})

// @route POST api/users/login
// @desc login user
// @access Public
router.post('/login', (req, res, next) => {
    const mobile = req.body.mobile
    const password = req.body.password
    User.find({ mobile })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth unsuccessful!"
                })
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth unsuccessful"
                    });
                }
                if (result) {
                    console.log(result)
                    return res.status(200).json({
                        message: 'Auth successful',
                        user_data: user[0],
                        auth: true
                    });
                } else {
                    return res.status(401).json({
                        message: 'Auth unsuccessful'
                    });
                }
            })
        })
})

module.exports = router;