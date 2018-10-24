const questionRouter = require('express').Router();
const QuestionController = require('../controllers/questionController.js');
const isLogin = require('../middlewares/isLogin.js');

questionRouter.get('/', QuestionController.showAll);
questionRouter.get('/:id', QuestionController.findWithId);
questionRouter.post('/create', isLogin, QuestionController.create);
questionRouter.delete('/:id', isLogin, QuestionController.delete);
questionRouter.put('/:id', isLogin, QuestionController.update);
questionRouter.get('/ownsquestion/user', isLogin, QuestionController.findByPoster);
questionRouter.patch('/upvote/:id', isLogin, QuestionController.upvote);
questionRouter.patch('/downvote/:id', isLogin, QuestionController.downvote);

module.exports = questionRouter;