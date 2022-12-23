var express = require('express');
var fs = require('fs')
var data = fs.readFileSync('users.json')
var words = JSON.parse(data);
var randomToken = require('random-token');

function isLessThan24HourAgo(date) {
  // 👇️                    hour  min  sec  milliseconds
  const twentyFourHrInMs = 24 * 60 * 60 * 1000;

  const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;
  console.log(Date.now());

  return date > twentyFourHoursAgo;
}

console.log(isLessThan24HourAgo(new Date())); // 👉️ true

console.log(isLessThan24HourAgo(new Date().getDate())); // 👉️ false

console.log(words)

console.log('API is on')

var app = express();
var server = app.listen(8000, listening)
function listening() {
  console.log("done")

}
app.use(express.static('website'))
app.use(express.static('img'))

app.get('/get-key', addWord);
function addWord(request, response) {
  var token = randomToken(16);
  var date =new Date();
  var date2 =Date.now();
  var data = request.params;
  var word = token;
  var score = date2;
  var reply;
  if (!score) {
    
    reply = {
      msg: "cant get token"
    }
  } else {
    words[word] = score;
    var data = JSON.stringify(words, null, 2);
    fs.writeFile("users.json", data, finished)


    function finished(err) {
      console.log("Key Generated | " + score + " | " + token)
    }
    var reply = token




  }
  response.send(reply)

}




app.get('/all', sendall);
function sendall(request, response) {
  response.send(words)
}



app.get('/search/:word', searchWord);
function searchWord(request, response) {
  var word = request.params.word;
  var score = request.params.score
  var date = new Date();
  var date2 = Date.now();
  var readall = JSON.parse(fs.readFileSync("./users.json"))
  

  

if(words[word] != "Admin key goes here"){
  if(!isLessThan24HourAgo(words[word])){
    delete words[word];
  var data = JSON.stringify(words, null, 2);
    fs.writeFile("./users.json", data, (err =>{ console.log(err); }))
  }
}
  
  var reply;
  if (words[word]) {
    reply = {
      status: "Found",
      token: word,
      name: words[word]
    }
  } else {
    reply = {
      status: "NOT Found",
      token: word
    }
  }
  response.send(reply)
}




