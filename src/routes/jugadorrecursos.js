const Router = require('koa-router');

const router = new Router();

router.post('jugadorrecurso.create', '/', async (ctx) => {
  try {
    const jugadorrecurso = await ctx.orm.JugadorRecursos.create(ctx.request.body);
    ctx.body = jugadorrecurso;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('jugadorrecursos.list', '/', async (ctx) => {
  try {
    const jugadorrecursos = await ctx.orm.JugadorRecursos.findAll();
    ctx.body = jugadorrecursos;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('jugadorrecurso.show', '/:id', async (ctx) => {
  try {
    const jugadorrecurso = await ctx.orm.JugadorRecursos.findOne({ where: { id: ctx.params.id } });
    ctx.body = jugadorrecurso;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('jugadorrecurso.delete', '/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const jugadorrecurso = await ctx.orm.JugadorRecursos.findByPk(id);

    if (jugadorrecurso) {
      await jugadorrecurso.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Jugador recurso no encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
