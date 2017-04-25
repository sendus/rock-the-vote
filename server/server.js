var express = require("express");
var bodyParser = require("body-parser");
var port = process.env.Port || 8000;
var app = express();
var ejs = require("ejs");
var path = require("path");
var apiRouter = require("./api.js");
var filesRouter = require("./files.js");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/retaurant");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname + "\\..\\public")));
app.set("views", __dirname + "\\..\\public\\views");

app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");

app.use("/menu", apiRouter);
app.use(filesRouter);

app.listen(port, function () {
    console.log("you are running port: " + port)
});