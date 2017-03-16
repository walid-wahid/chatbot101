var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
//var db = mongoose.connect(process.env.MONGODB_URI);
var Jobs = require("./models/jobs");
var app = express();
//var webhooks = require('./controllers/webhook') ;
var url = "https://www.indeed.com/jobs?q=civil+engineer&l=NY";
var company = [];
var jobtitle = [];
var summary = [];
var location = [];
var salary = [];
var date = [];
var reviews = [];
var jobsArray = [];



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));
console.log("listening ");
// Server index page
// app.get("/", function (req, res) {
//   res.send("Deployed!");
// });
//
// // Facebook Webhook
// // Used for verification
// app.get("/webhook",webhooks.get );
// // All callbacks for Messenger will be POST-ed here
//
// app.post("/webhook",webhooks.post );
//
//
mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    }

})


request(url, function(err, response, body) {
    var $ = cheerio.load(body);


    $('.jobtitle').each(function(i, elem) {
        jobtitle[i] = $(this).text().trim().toLowerCase();
        });


    $('.company').each(function(i, elem) {
        company[i] = $(this).text().trim().toLowerCase();
        });


    $('.summary').each(function(i, elem) {
        summary[i] = $(this).text().trim().toLowerCase();
    });

    $('.location').each(function(i, elem) {
        location[i] = $(this).text().trim().toLowerCase();
    });
    $('nobr').each(function(i, elem) {
      // sometimes salary is not defined it will be set to about
      // we need to check that condition
        salary[i] = $(this).text().trim().toLowerCase();
        if (salary[i]) == "about" {
          salary[i] = "not specified"
        }
    });
    $('.date').each(function(i, elem) {
        date[i] = $(this).text().trim();
    });
    $('.s1NoUnderline').each(function(i, elem) {

        reviews[i] = $(this).text().trim();
    });



    for (var i = 0; i < summary.length; i++) {

jobsArray.push(new Jobs({
  title:jobtitle[i] ,
  company:company[i],
  summary:summary[i] ,
  posting_date:date[i],
  job_location:location[i] ,
  year_salary:salary[i] ,
  reviews_number:reviews[i]
}))

jobsArray[i].save(function (err,result) {
  if(err){
     console.log(err.message);
  }
  else console.log("saved correctly");
})


console.log(jobsArray[i]);
}
});
