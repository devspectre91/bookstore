var express = require('express');
var router= express.Router();

router.get('/', (req,res)=>{
    res.render('index')
})

router.get('/about', (req,res)=>{
    res.send("Collection of books");
})

module.exports=  router;