//require modules
var express = require("express");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var booksRouter = require("./routes/books");
var commentsRouter = require("./routes/comments");

//connect to db
mongoose.connect(
  "mongodb://127.0.0.1:27017/bookstore",
  { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false},
  (err) => {
    err ? console.log(err) : console.log("connected to mongodb");
  }
);

//instantiate express
var app = express();

//middlewares
app.use(express.urlencoded({ extended: false }));

//setup the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


//capture form data
app.use(express.urlencoded({extended:true}));
//setup static directory

app.use(express.static(__dirname+ '/public'));

//routing middleware
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/comments", commentsRouter);

//error middlewares
app.use((req, res, next) => {
  res.send("Page not found 404");

  next();
});
app.use((err, req, res, next) => {
  res.send(err);
 
});

app.listen("3000", () => {
  console.log("server is running on port 3000");
});
