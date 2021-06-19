// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
var cors = require('cors')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder

app.use(express.static('website'));

app.get("/api/data", (req,res,next) => {
    res.json(projectData)
})
app.post("/api/data", (req,res,next) => {
    projectData = {...req.body}
    res.json(projectData)
})
// Setup Server
app.listen(8080, () => {
    console.log("server started")
})
