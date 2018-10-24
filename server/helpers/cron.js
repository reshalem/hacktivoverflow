const cron = require('node-cron');
const Answer = require('../models/answerModel.js');

// Delete poor answers with 2 or more downvotes every week
// at 00:00 on Sunday.

cron.schedule('0 0 * * 0', function() {
  Answer.find()
    .then(function(answers) {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].downvotes.length > 2) {
          Answer.deleteOne({_id: answers[i]._id})
            .then(function(result) {
              console.log('Bad comment with 2 or more downvotes amount has been deleted');
            })
            .catch(function(err) {
              console.log(err);
            });
        }
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = cron;