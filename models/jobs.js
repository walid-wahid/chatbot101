var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var jobSchema = new Schema({
    user_id: String,
    title: String,
    company: String,
    summary: String,
    posting_date:String,
    job_location: String,
    year_salary: String,
    reviews_number: String

});


module.exports = mongoose.model("Job", jobSchema);
