var models = require('../models/models.js');

// GET /quizes/comments
exports.comments = function(req, res) {
  models.Comment.findAll().success(function(comment) {
    res.render('comments/comments', { comments: comment[0].comments});
  })
};

exports.new = function(req, res) {
  res.render('../views/comments.hbs');
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