sendMessage = require("./sendMessage") ;
getjobDetail = require("./jobDetails") ;
findJobs = require("./findJobs") ;
module.exports = function processMessage(event) {
  if (!event.message.is_echo) {
    var message = event.message;
    var senderId = event.sender.id;

    console.log("Received message from senderId: " + senderId);
    console.log("Message is: " + JSON.stringify(message));

    // You may get a text or attachment but not both
    if (message.text) {
      var formattedMsg = message.text.toLowerCase().trim();

      // If we receive a text message, check to see if it matches any special
      // keywords and send back the corresponding movie detail.
      // Otherwise, search for new movie.
      switch (formattedMsg) {
        case "plot":
        case "date":
        case "runtime":
        case "director":
        case "cast":
        case "rating":
          getJobDetail(senderId, formattedMsg);
          break;

        default:
          findJobs(senderId, formattedMsg);
      }
    } // else if (message.attachments) {
      sendMessage(senderId, {text:"I can't understand your request ." });
/*    }
  }*/
}
}
