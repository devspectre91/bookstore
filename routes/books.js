var express = require("express");
var router = express.Router();
var Book = require('../models/books');
var Comment = require('../models/comments');

router.get("/", (req, res,next) => {
  Book.find({}, (err, books)=>{
    if(err) next(err);
    res.render('books', {books:books})
  })
});
router.get("/new", (req, res,next) => {

  res.render("addBook");
});


router.get("/new", (req, res,next) => {

  res.render("addBook");
});
router.get("/:id", (req, res,next) => {
    var id = req.params.id;
    Book.findById(id, (err, book)=>{
      if(err) next(err);
     Comment.find({bookId:id},(err,comments)=>{
       res.render('bookDetails', {book:book,comments:comments})
     });
  
     
    })
  });
  router.get("/:id/edit", (req, res,next) => {
    var bookId = req.params.id;
    Book.findById(bookId, (err, book)=>{
      if(err) next(err);
      console.log(book)
      res.render('editBookForm', {book:book})
    })
  });
  //create comment form
  router.post("/:id/comments", (req, res,next) => {
    var bookId=req.params.id;
    req.body.bookId= req.params.id;
    Comment.create( req.body, (err, comment)=>{
      if(err) next(err);
      console.log(comment)
      res.redirect('/books/' + bookId);
      
    })
  });
  router.get("/:id/delete", (req, res,next) => {
    var bookId = req.params.id;
    Book.findByIdAndDelete(bookId, (err, book)=>{
      if(err) next(err);
      console.log(book)
      res.redirect('/books');
    })
  });
router.post("/", (req, res, next) => {
    Book.create(req.body, (err, book)=>{
        if(err) next(err);
        console.log(err, book);
        res.redirect("/books");
    })
 
});
router.post("/:id", (req, res, next) => {
    var bookId = req.params.id;
    Book.findByIdAndUpdate(bookId, req.body, (err, updatedBook)=>{
        if(err) next(err);
        console.log(err, updatedBook);
        res.redirect("/books/"+ bookId);
    })
 
});


module.exports = router;
