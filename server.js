//sets up express which is web server library
var express = require("express");
var app = express();

//import sentiment analysis library and JSON data file of Reddit comments
var ml = require("ml-sentiment")();
var redditComments = require("./comments.json");

// function loop through all Reddit comments and use ml.classify function to get sentiment
// score and save that value into redditComments array
redditComments.forEach(function(comment) {
    comment.sentiment = ml.classify(comment.body);
    if (comment.sentiment >= 5) {
        comment.emoji = "😃";
    } else if (comment.sentiment > 0) {
        comment.emoji = "🙂";
    } else if (comment.sentiment === 0) {
        comment.emoji = "😐";
    } else {
        comment.emoji = "😕";
    }
});

//define two routes in Express that send redditComments data in webpage
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/data", function(req, res) {
    res.json(redditComments);
});

//starts server and tells which port listening on
const listener = app.listen(3000, function() {
    console.log("Your app is listening on port " + listener.address().port);
})