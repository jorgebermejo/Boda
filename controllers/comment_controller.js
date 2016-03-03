var models = require('../models/models.js');

exports.show = function (req,res) {
   models.Comment.findAll().then(function(comment) {
     res.render('../views/comments', {comment: comment});
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
  var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	console.log('NOmbre: '+JSON.stringify(req.body.nombre));
var comment=models.Comment.build(req.body);
  
  comment.save({fields: ["nombre","comentario","dia","hora"]}).then(function(){
    res.render('../views/comments', {comment: comment});
  })
  
	
 /* models.Comment.findAll().then(function(comment) {
     res.render('../views/comments', {comment: comment});
  })*/
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