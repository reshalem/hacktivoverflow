const Answer = require('../models/answerModel.js');

class AnswerController {
    static add(req, res) {
        Answer.create({
            content: req.body.content,
            question: req.params.id,
            user: req.user._id
        })
            .then(function(answer) {
                res.status(200).json(answer);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static showAll(req, res) {
        Answer.find({question: req.params.id}).populate('user', '_id username email')
            .then(function(answers) {
                res.status(200).json(answers);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static update(req, res) {
        // console.log(req.params.id, req.user._id, req.body.id)
        Answer.updateOne({question: req.params.id, user: req.user._id, _id: req.body.id}, {content: req.body.content})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static delete(req, res) {
        Answer.deleteOne({question: req.params.id, user: req.user._id, _id: req.body.id})
            .then(function(result) {
                res.status(200).json(result);
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static upvote(req, res) {
        Answer.findById(req.body.id)
            .then(function(answer) {
                if (answer.user != req.user._id) {
                    if (answer.upvotes.indexOf(req.user._id) === -1) {
                        answer.update({
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
                    } else {
                        answer.update({
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
                        message: 'You cannot upvote your own answer'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }

    static downvote(req, res) {
        Answer.findById(req.body.id)
            .then(function(answer) {
                if (answer.user != req.user._id) {
                    if (answer.downvotes.indexOf(req.user._id) === -1) {
                        answer.update({
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
                    } else {
                        answer.update({
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
                        message: 'You cannot downvote your own answer'
                    });
                }
            })
            .catch(function(err) {
                res.status(500).json(err);
            });
    }
}

module.exports = AnswerController;