module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Usuarios', [
    {
      idUsuario: 0,
      nombreUsuario: 're',
      correo: 'renateo@uc.cl',
      clave: 'grupoweb',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      idUsuario: 1,
      nombreUsuario: 'amanda',
      correo: 'amandeo@uc.cl',
      clave: 'grupoweb',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      idUsuario: 2,
      nombreUsuario: 'ramiro',
      correo: 'ramireo@uc.cl',
      clave: 'grupoweb',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
