const Router = require('koa-router');

const router = new Router();

router.post('casilla.create', '/casilla.create', async (ctx) => {
  try {
    const casilla = await ctx.orm.Casillas.create(ctx.request.body);
    ctx.body = casilla;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('casillas.list', '/', async (ctx) => {
  try {
    const casillas = await ctx.orm.Casillas.findAll();
    ctx.body = casillas;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('casilla.show', '/:id', async (ctx) => {
  try {
    const casilla = await ctx.orm.Casillas.findOne({ where: { id: ctx.params.id } });
    ctx.body = casilla;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('casilla.delete', '/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const casilla = await ctx.orm.Casillas.findByPk(id);

    if (casilla) {
      await casilla.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Casilla no encontrada' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
