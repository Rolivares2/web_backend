const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Jugadores, {
        foreignKey: 'id',
      });
    }
  }
  Usuarios.init({
    nombreUsuario: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'El nombre de usuario solo puede contener letras y numeros',
        },
      },
    },
    correo: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'El correo debe tener un formato válido',
        },
      },
    },
    clave: {
      type: DataTypes.STRING,
      validate: {
        isValidPassword(value) {
          console.log(value);
          console.log('revisando clave');
          if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*#?&]/)) {
            throw new Error('La clave debe tener al menos una letra, un número y un caracter especial');
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};
