//imports
const express = require("express"); //Express is a routing and middleware web framework
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //parsers requests and returns data in the appropriate format
//Node.js body parsing middleware. Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require("cors");
require("dotenv/config"); //Dotenv is a zero-dependency module that loads environment variables from a ".env" file into "process.env".

app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
//Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain
//outside the domain from which the first resource was served.

//Set a middleware to ensure that every time we hit any request, the body-parser will run
app.use(bodyParser.json());

//import routes
const postsRoute = require("./routes/posts");

//A middleware to apply routes from posts
app.use("/posts", postsRoute);
//We can have multiple middlewares for different pathes

//Middleware - it's like a function that executes when the specific routes are requested
//The function is executed every time the app receives a request.
//Every time we hit the specified route, the callback function will run
//***** app.use("/user/:id", function (req, res, next) {console.log("This middleware runs")});
//The function above is executed for any type of HTTP request on the /user/:id path.

//ROUTES
app.get("/", (req, res) => {
  res.send("It works");
});

//GET - app.get() - to get some data
//POST - app.post() - to send some data (e.g. with form)
//DELETE - app.delete() - to remove some data
//PATCH - app.patch() - to updata some data

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to db!");
  }
);

app.listen(3000, () => console.log("The server runs on port 3000"));

//*******************simple way to check is everything working*********//
//run the following code on the front-end side

// fetch('http://localhost:3000/posts/')
// .then(result => {return result.json();})
// .then(data => {console.log(data);})
