jobs = require("../models/jobs");
mongoose=require("mongoose") ;
module.exports = function getJobDetail(userId, field) {
  Movie.findOne({user_id: userId}, function(err, movie) {
    if(err) {
      sendMessage(userId, {text: "Something went wrong. Try again"});
    } else {
      sendMessage(userId, {text: jobs[field]});
    }
  });
}
