var models = require('../models/models.js');

exports.show = function (req,res) {
  models.Comment.find(req.params.commentId).then(function(comment) {
    res.render('quizes/show', {comment: comment});
  })
}


// GET /quizes/comments
exports.comments = function(req, res) {
  models.Comment.findAll().then(function(comment) {
    res.render('comments/comments', { comments: comment[0].comments});
  })
};

/*exports.new = function(req, res) {
  res.render('../views/comments');
};*/

exports.new = function(req, res) {
  models.Comment.findAll().then(function(comment) {
     res.render('../views/comments', {comment: comment});
  })
};



/*
// GET /quizes/answer
exports.answer = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
    if (req.query.respuesta === quiz[0].respuesta) {
      res.render('quizes/answer', { respuesta: 'Correcto' });
    } else {
      res.render('quizes/answer', { respuesta: 'Incorrecto'});
    }
  })
};*/