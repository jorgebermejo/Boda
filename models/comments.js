module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comment', 
    { nombre: DataTypes.STRING,
      comentario: DataTypes.STRING,
    });
}