const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Partida extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Jugadores, {
        foreignKey: 'id',
      });
      this.belongsTo(models.Tableros, {
        foreignKey: 'idTablero',
      });
    }
  }
  Partida.init({
    numeroJugadores: DataTypes.INTEGER,
    idTablero: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Partida',
  });
  return Partida;
};
