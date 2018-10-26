const Question = require('../models/questionModel.js');
const Answer = require('../models/answerModel.js');
const mongoose = require('mongoose');

class QuestionController {
    static create(req, res) {
        let question = new Question({
            title: req.body.title,
            description: req.body.description,
            poster: req.user._id
        });
        question.save()
            .then(function(question) {
                const response = {
                    success: true,
                    message: `Question ${question.title} created`,
                    question: question
                }
                res.status(201).json(response);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Question.find().populate('poster')
            .then(function(questions) {
                res.status(200).json(questions);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static findWithId(req, res) {
        Question.findById(req.params.id).populate('poster')
            .then(function(question) {
                res.status(200).json(question);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        Question.findOne({_id: req.params.id, poster: req.user._id})
            .then(function(question) {
                if (question) {
                    question.title = req.body.title;
                    question.description = req.body.description;

                    question.save()
                        .then(function(result) {
                            const response = {
                                success: true,
                                message: `Question successfully updated`
                            };
                            res.status(200).json(response);
                        })
                        .catch(function(err) {
                            res.status(500).json(err);
                        });
                } else {
                    res.status(404).json({
                        message: 'Question not found'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Question.deleteOne({_id: req.params.id, poster: req.user._id})
            .then(function(result) {
                Answer.deleteMany({question: req.params.id})
                    .then(function(resultAnswer) {
                        const response = {
                            success: true,
                            message: `Question successfully deleted`
                        };
                        res.status(200).json(response);
                    })
                    .catch(function(err) {
                        res.status(500).json(err);
                    });
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static findByPoster(req, res) {
        const posterId = new mongoose.Types.ObjectId(req.user._id);
        Question.find().populate('poster')
            .then(function(questions) {
                const result = questions.filter(function(datum) {
                    return posterId.equals(datum.poster._id);
                });
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static upvote(req, res) {
        Question.findById(req.params.id)
            .then(function(question) {
              const posterId = new mongoose.Types.ObjectId(req.user._id);
                if (question.poster.equals(posterId) === false) {
                    let alreadyDownvote = question.downvotes.indexOf(req.user._id) !== -1;
                    if (question.upvotes.indexOf(req.user._id) === -1) {
                        if (alreadyDownvote) {
                            question.update({
                                $pull: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(result) {
                                    question.update({
                                        $push: {
                                            upvotes: req.user._id
                                        }
                                    })
                                        .then(function(result) {
                                            res.status(200).json(result);
                                        })
                                        .catch(function(err) {
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    res.status(500).json(err);
                                });
                        } else  {
                            question.update({
                                $push: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(result) {
                                    res.status(200).json(result);
                                })
                                .catch(function(err) {
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        question.update({
                            $pull: {
                                upvotes: req.user._id
                            }
                        })
                            .then(function(result) {
                                res.status(200).json(result);
                            })
                            .catch(function(err) {
                                res.status(500).json(err);
                            });
                    }
                } else {
                    res.status(400).json({
                        message: 'You cannot upvote your own post'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static downvote(req, res) {
        Question.findById(req.params.id)
            .then(function(question) {
              const posterId = new mongoose.Types.ObjectId(req.user._id);
                if (question.poster.equals(posterId) === false) {
                    let alreadyUpvote = question.upvotes.indexOf(req.user._id) !== -1;
                    if (question.downvotes.indexOf(req.user._id) === -1) {
                        if (alreadyUpvote) {
                            question.update({
                                $pull: {
                                    upvotes: req.user._id
                                }
                            })
                                .then(function(result) {
                                    question.update({
                                        $push: {
                                            downvotes: req.user._id
                                        }
                                    })
                                        .then(function(result) {
                                            res.status(200).json(result);
                                        })
                                        .catch(function(err) {
                                            res.status(500).json(err);
                                        });
                                })
                                .catch(function(err) {
                                    res.status(500).json(err);
                                });
                        } else {
                            question.update({
                                $push: {
                                    downvotes: req.user._id
                                }
                            })
                                .then(function(result) {
                                    res.status(200).json(result);
                                })
                                .catch(function(err) {
                                    res.status(500).json(err);
                                });
                        }
                    } else {
                        question.update({
                            $pull: {
                                downvotes: req.user._id
                            }
                        })
                            .then(function(result) {
                                res.status(200).json(result);
                            })
                            .catch(function(err) {
                                res.status(500).json(err);
                            });
                    }
                } else {
                    res.status(400).json({
                        message: 'You cannot downvote your own post'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}

module.exports = QuestionController;