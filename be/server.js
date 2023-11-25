const express = require("express");
const serverConfig = require('./config/serverConfig')
const bodyParser = require("body-parser");
const cors = require("cors");

// Sample Job Data
const db = require('./models/index')
const app = express();
const cookieParser = require("cookie-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
//Impoerting models from models
const User = db.User;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true,
  })
);

//Connecting to yiur localhist/test db
db.connectDB()
//initializing database




// Requiring all the routes
require("./routes/index")(app);


app.listen(serverConfig.PORT, () => {
  console.log("Server Started on " + serverConfig.PORT);
});
