var express = require('express');
var router = express.Router();
var books = require('../resources/books')
var Books = require('../models/books');

router.get('/add', function(req, res, next) {
  res.render('addBooks', { title: 'Add Books'});
});

router.post('/save', function(req, res, next) {
  const book = new Books(req.body);
  book.save();
  res.redirect('/')
});


router.get('/edit/:_id', async function(req, res, next) {
  const book = await Books.findOne({_id: req.params._id})
  // console.log(req.params._id)
  // const book = books.find((books)=> books._id === req.params._id)
  console.log(book)
  res.render('editBooks', { title: 'Edit Books',book:book});     //right side ko book is line 17 ko book
});

router.post('/saveEdited/:_id',async function(req,res,next){
   await Books.updateOne({_id: req.params._id},{$set: req.body})
 
  // const currentIndex = books.findIndex((book) => book._id === req.params._id)
  // books.splice(currentIndex, 1, {...req.body, _id:req.params._id})
  res.redirect('/')
});

router.get('/delete/:_id', async function(req, res, next) {
  await Books.deleteOne({_id: req.params._id})
  // const currentIndex = books.findIndex((book) => book._id === req.params._id)
  // books.splice(currentIndex, 1)
  res.redirect('/')
});



module.exports = router;
