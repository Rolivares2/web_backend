const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tableros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Partida, {
        foreignKey: 'id',
      });
      this.hasOne(models.Casillas, {
        foreignKey: 'id',
      });
    }
  }
  Tableros.init({
    nombreEscenario: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tableros',
  });
  return Tableros;
};
