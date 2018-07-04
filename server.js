const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const dbConnectionURL = "mongodb://51.144.238.177:27017";
const cookieParser = require('cookie-parser')
const session = require('express-session');

const app = express();

const http = require('http').createServer(app).listen(1234);
const io = require('socket.io').listen(http);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

io.emit('some event', { for: 'everyone' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.static(__dirname+"/client"));

app.use(cookieParser())
app.use(session({secret: 'cookie', saveUninitialized: true, resave: true}));

let client = mongoClient.connect(dbConnectionURL, (err, db) => {
    if(err) throw err
    let dbo = db.db('pwDB')
    dbo.createCollection('users', (err, result) => {
        if(err) throw err
        console.log("Created collection: users")
        db.close()
    })
})

app.get('/get-all', (req, res)=>{
    console.log(req.body)
    mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("users").find({}).toArray(function(err, response) {
          if (err) throw err;
          db.close();
          res.send(response)
        });
      })
})


app.get('/getAdminUser', (req, res)=>{
    mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("users").find({checkedUser:"1"}).toArray(function(err, response) {
          if (err) throw err;
          db.close();
          console.log(response);
          res.send(response)
        });
      })
})


/*app.post('/addUser', (req, res)=>{
    console.log(req.body)
    mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        var myobj = { name: req.body.user1, password: req.body.password1, checkedUser: req.body.userChecked };

        dbo.collection("users").insertOne(myobj, function(err, response) {
          if (err) throw err;
          console.log("User inserted");
          db.close();
          res.send("User created successfully");
        });
      })
})*/


app.post('/addUser', (req, res)=>{
   console.log(req.body)
    mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        var myobj = { name: req.body.user1, password: req.body.password1, checkedDsgn: req.body.checkedDsgn, checkedNeedDsgn: req.body.checkedNeedDsgn };

        dbo.collection("users").insertOne(myobj, function(err, response) {
          if (err) throw err;
          console.log("User inserted");
          db.close();
          res.send("User created successfully");
        });
      })
})

app.post('/search', (req, res)=> {
  mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("users").find({name: req.body.user1,
                                      password: req.body.password1}).toArray(function(err, response) {
          if (err) throw err;
          db.close();
		  console.log(response)
          res.send(response)
        });
})
})

app.post('/getContest', (req, res)=> {
	console.log(req.body)
	 mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("users").find({category: req.body.category,
                                      subcategory: req.body.subcategory}).toArray(function(err, response) {
          if (err) throw err;
          db.close();
		  console.log(response)
          res.send(response)
        });
})
})

app.post('/saveContest', (req, res)=> {
	console.log(req.body)
	 mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("contest").insertOne({contestTitle: req.body.contestTitle,
                                      contestBrief: req.body.contestBrief,
									  other: req.body.other}, function(err, response) {
          if (err) throw err;
          console.log("Contest inserted");
          db.close();
        });
})
})

app.get('/getAllContests', (req, res)=>{
	console.log("getAllcontestscallllll")
    mongoClient.connect(dbConnectionURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("pwDB");
        dbo.collection("contest").find({}).toArray(function(err, response) {
          if (err) throw err;
          db.close();
          res.send(response)
        });
      })
})


app.listen("9090", () => {
    console.log('Server started on 9090')
})
