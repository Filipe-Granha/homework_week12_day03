var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");
var MongoClient = require("mongodb").MongoClient
var db;
// var pos;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));



 



app.get("/countries", function(req, res) {
  db.collection("countries").find().toArray(function(err, results) {
    res.json(results);
  });
});


app.post("/countries", function(req, res) {
  db.collection("countries").save(req.body, function(err, result) { 
    res.redirect("/"); 
  })
})

app.post("/delete", function(req, res) {
  db.collection("countries").drop({}, function(err, result) { 
    res.redirect("/"); 
  })
})



MongoClient.connect("mongodb://localhost:27017/bucket_list", function(err, database) {
  if(err) {
    console.log(err);
    return;
  }
  db = database;
  console.log("connected to database");
  app.listen(3000, function(){
    console.log("Listening on port 3000");
  });
}); 




app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');

});
 