const questionRouter = require('express').Router();
const QuestionController = require('../controllers/questionController.js');
const isLogin = require('../middlewares/isLogin.js');

// questionRouter.get('/', QuestionController.shwoAll);
// questionRouter.get('/:id', QuestionController.findWithId);
// questionRouter.post('/create', QuestionController.create);
// questionRouter.delete('/:id', isLogin, QuestionController.delete);
// questionRouter.put('/:id', isLogin, QuestionController.update);
// questionRouter.get('/ownsqustion/user', isLogin, QuestionController.findByPoster);

module.exports = questionRouter;