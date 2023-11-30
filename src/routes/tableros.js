const Router = require('koa-router');

const router = new Router();

router.post('tablero.create', '/tablero.create', async (ctx) => {
  try {
    const tablero = await ctx.orm.Tableros.create(ctx.request.body);
    ctx.body = tablero;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('tableros.list', '/', async (ctx) => {
  try {
    const tableros = await ctx.orm.Tableros.findAll();
    ctx.body = tableros;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('tablero.show', '/:id', async (ctx) => {
  try {
    const tablero = await ctx.orm.Tableros.findOne({ where: { id: ctx.params.id } });
    ctx.body = tablero;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('tablero.delete', '/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const tablero = await ctx.orm.Tableros.findByPk(id);

    if (tablero) {
      await tablero.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Tablero no encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
