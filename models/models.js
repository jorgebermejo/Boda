var path = require('path');
// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comments');
var Comment = sequelize.import(comment_path);
var date = new Date(); 
//var dia_format = date.getDay() + "-" + date.getMonth() +  "-" + date.getFullYear();
var month = new Array();
month[0] = "Enero";
month[1] = "Febrero";
month[2] = "Marzo";
month[3] = "Abril";
month[4] = "Mayo";
month[5] = "Junio";
month[6] = "Julio";
month[7] = "Agosto";
month[8] = "Septiembre";
month[9] = "Octubre";
month[10] = "Noviembre";
month[11] = "Diciembre";
var month_name = month[date.getMonth()];
var dia_format = date.getDate()+ " de " + month_name + " de " + date.getFullYear(); ;
var hora_format = (("0"+date.getHours()).slice(-2))+ ":" + (("0"+date.getMinutes()).slice(-2));
exports.Comment = Comment; // exportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // success(..) ejecuta el manejador una vez creada la tabla
  Comment.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Comment.create({ nombre: 'Jorge y Cris',
      	            comentario: 'Hola a todos!! \n Gracias por pasar por aquí y dejar vuestros comentarios.',
      	            dia: dia_format,
      	            hora: hora_format
      	         })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});