var express = require('express');
var router= express.Router();
var Comment = require('../models/comments');


router.get('/:id/edit', (req,res, next)=>{
  var id = req.params.id;
  Comment.findById(id, (err,comment)=>{
     if(err) return next(err);
     res.render('updateComment', {comment});
  })
})
router.get('/:id/delete', (req,res, next)=>{
    var id = req.params.id;
    Comment.findByIdAndRemove(id, (err,comment)=>{
       if(err) return next(err);
       res.redirect("/books/"+ comment.bookId);
    })
  })
router.post("/:id", (req, res, next) => {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, updatedComment)=>{
        if(err) next(err);
        console.log(err, updatedComment);
        res.redirect("/books/"+ updatedComment.bookId);
    })
 
});

module.exports=  router;