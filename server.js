// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

//json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", (req, res) => {
  res.json({
    unix: Date.now(),
    utc: Date()
  });
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  const date = req.params.date_string;
  const dateObj = new Date(date)
  const regexTest = /\d{5,}/g.test(date);

  console.log(typeof dateObj, dateObj.toString())
  
  
  
if(regexTest){
  res.json({
    unix: date,
    utc: new Date(parseInt(date)).toUTCString()
  })
} else if (dateObj.toString() === "Invalid Date"){
  res.json({
    error: 'Invalid Date'
    
  })
} else {
  res.json({
    unix: dateObj.getTime(),
    utc: dateObj.toUTCString()
  })
}
  
  
});

/*
res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });


*/

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
