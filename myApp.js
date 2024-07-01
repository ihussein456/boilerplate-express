//allows access to env files
require('dotenv').config() 
let bodyParser = require('body-parser')
let express = require('express');
let app = express();


console.log("Hello World")


app.get("/", (req,res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use("/public", express.static( __dirname + "/public"))


console.log(process.env.MESSAGE_STYLE)
app.get("/json", (req,res) => {
    process.env.MESSAGE_STYLE == "uppercase"?
    res.json({"message":"HELLO JSON"})
    : res.json({"message":"Hello json"})
})


//Used middleware to get the request objects method, path and ip address
app.use("/", (req,res,next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    console.log("heyyy")
    next() //to make sure it doesnt keep repeating
})


//Chained middleware to a handler function
//Added the time to the req object with middleware mounted
//displayed it as json in the handler function
app.get("/now", (req,res,next) => {
    req.time = new Date().toString()
    console.log(req.time)
    next()
}, (req, res) => {
    res.json({"time": req.time})
})

//get parameters in the url by using req.params
app.get("/:word/echo", (req, res, next) => {
    res.json({"echo": req.params.word})
})
//get queries in url following ? key
app.get("/name", (req, res) => {
    res.json({ name: req.query.first + " "+ req.query.last})
})

//encode the request body
app.use(bodyParser.urlencoded({ extended: false }));

//post the json from the form onto the page big dub
app.post("/name", (req, res) => {
    res.json({name: req.body.first+" "+req.body.last})
})

 module.exports = app;










 module.exports = app;
