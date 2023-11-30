const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JugadorRecursos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Jugadores, {
        foreignKey: 'idJugador',
      });
    }
  }
  JugadorRecursos.init({
    idJugador: DataTypes.INTEGER,
    idRecurso: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'JugadorRecursos',
  });
  return JugadorRecursos;
};
