const Router = require('koa-router');

const router = new Router();

// router.post('usuario.create', '/', async (ctx) => {
//   try {
//     const usuario = await ctx.orm.Usuarios.create(ctx.request.body);
//     ctx.body = {success:true, message: 'Usuario registrado exitosamente', model: usuario};
//     ctx.status = 201;
//   } catch (error) {
//     ctx.body = error;
//     ctx.status = 400;
//   }
// });

router.get('usuarios.list', '/', async (ctx) => {
  try {
    const usuarios = await ctx.orm.Usuarios.findAll();
    ctx.body = usuarios;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('usuario.show', '/:id', async (ctx) => {
  try {
    const usuario = await ctx.orm.Usuarios.findOne({ where: { id: ctx.params.id } });
    ctx.body = usuario;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('usuario.delete', '/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const usuario = await ctx.orm.Usuarios.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Usuario no encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
