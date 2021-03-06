const answerRouter = require('express').Router();
const AnswerController = require('../controllers/answerController.js');
const isLogin = require('../middlewares/isLogin.js');

answerRouter.get('/:id', isLogin, AnswerController.showAll);
answerRouter.post('/:id', isLogin, AnswerController.add);
answerRouter.put('/:id', isLogin, AnswerController.update);
answerRouter.delete('/:id', isLogin, AnswerController.delete);
answerRouter.patch('/upvote/', isLogin, AnswerController.upvote);
answerRouter.patch('/downvote/', isLogin, AnswerController.downvote);

module.exports = answerRouter;
