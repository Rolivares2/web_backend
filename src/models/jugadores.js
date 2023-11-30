const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jugadores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Usuarios, {
        foreignKey: 'idUsuario',
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'idPartida',
      });
      this.belongsTo(models.Casillas, {
        foreignKey: 'idCasilla',
      });
      this.hasMany(models.JugadorRecursos, {
        foreignKey: 'id',
      });
    }
  }
  Jugadores.init({
    idUsuario: DataTypes.INTEGER,
    idPartida: DataTypes.INTEGER,
    idCasilla: DataTypes.INTEGER,
    tipoPersonaje: DataTypes.INTEGER,
    llaveCofre: DataTypes.BOOLEAN,
    salud: DataTypes.INTEGER,
    puntaje: DataTypes.INTEGER,
    is_admin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Jugadores',
  });
  return Jugadores;
};
