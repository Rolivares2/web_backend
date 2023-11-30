const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Casillas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Tableros, {
        foreignKey: 'idTablero',
      });
      this.hasMany(models.Jugadores, {
        foreignKey: 'id',
      });
    }
  }
  Casillas.init({
    idRecurso: DataTypes.INTEGER,
    idTablero: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Casillas',
  });
  return Casillas;
};
