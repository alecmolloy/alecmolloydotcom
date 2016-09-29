var express = require("express"),
	compression = require("compression"),
	pug = require("pug"),
	logger = require("morgan");


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/alecmolloy');

var app = express(),
port = process.env.PORT || 3000;

app.use(compression());
app.use(function (req, res, next) {
	req.db = db;
	next();
});

app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.locals.basedir = __dirname;
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));

var router = express.Router();

app.use("/", require("./routes/"));
app.use("/post", require("./routes/blog"));

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.listen(port);
