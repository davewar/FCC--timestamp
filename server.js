// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp", function (req, res) {
              dte = new Date()

              res.json(
                  {"unix": dte.getTime(), "utc" : dte.toUTCString() }
                  )     
          
});




//  Date("ggfdgfgfg")   returns "Invalid Date"

//        /api/timestamp/1988-03-21
//                 /api/timestamp/1479663089000
//  new Date('1988-03-21')

app.get("/api/timestamp/:date_string", function (req, res) {
                  let dte =  new Date((req.params.date_string)) ;

                  // fcc sending string  + intS . 
                  if (dte.toString() === "Invalid Date"){
                    dte =  new Date(parseInt((req.params.date_string))) ;
                  }
                  
                  if(dte.toString() === "Invalid Date"){
                          res.json({"error" : "Invalid Date" })
                  } else {
                      res.json(
                                   {"unix": dte.getTime(), "utc" : dte.toUTCString() }
                                 )  
                  }


});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
