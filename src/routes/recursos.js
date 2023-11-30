const Router = require('koa-router');

const router = new Router();

router.post('recurso.create', '/', async (ctx) => {
  try {
    const recurso = await ctx.orm.Recursos.create(ctx.request.body);
    ctx.body = recurso;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('recursos.list', '/', async (ctx) => {
  try {
    const recursos = await ctx.orm.Recursos.findAll();
    ctx.body = recursos;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('recurso.show', '/:id', async (ctx) => {
  try {
    const recurso = await ctx.orm.Recursos.findOne({ where: { id: ctx.params.id } });
    ctx.body = recurso;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('recurso.delete', '/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const recurso = await ctx.orm.Recursos.findByPk(id);

    if (recurso) {
      await recurso.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Recurso no encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
