/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUsuario: {
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' },
      },
      idPartida: {
        type: Sequelize.INTEGER,
        references: { model: 'Partidas', key: 'id' },
      },
      idCasilla: {
        type: Sequelize.INTEGER,
        references: { model: 'Casillas', key: 'id' },
      },
      tipoPersonaje: {
        type: Sequelize.INTEGER,
      },
      llaveCofre: {
        type: Sequelize.BOOLEAN,
      },
      salud: {
        type: Sequelize.INTEGER,
      },
      puntaje: {
        type: Sequelize.INTEGER,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Jugadores');
  },
};
