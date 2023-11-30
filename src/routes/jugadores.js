const Router = require('koa-router');

const router = new Router();

// const personajes = [
//   {
//     id: '1',
//     ruta_imagen: 'src/assets/imgs/pirata1.png',
//   },
//   {
//     id: '2',
//     ruta_imagen: 'src/assets/imgs/pirata2.png',
//   },
//   {
//     id: '3',
//     ruta_imagen: 'src/assets/imgs/guacamayo.png',
//   },
//   {
//     id: '4',
//     ruta_imagen: 'src/assets/imgs/pirata3.png',
//   },
//   {
//     id: '5',
//     ruta_imagen: 'src/assets/imgs/loro.png',
//   },
//   {
//     id: '6',
//     ruta_imagen: 'src/assets/imgs/pirata4.png',
//   },
//   {
//     id: '7',
//     ruta_imagen: 'src/assets/imgs/pirata5.png',
//   },
//   {
//     id: '8',
//     ruta_imagen: 'src/assets/imgs/mono.png',
//   },

// ];

router.post('jugadores.create', '/jugador.create', async (ctx) => {
  try {
    console.log(ctx.request.body);
    const jugador = await ctx.orm.Jugadores.create(ctx.request.body);
    ctx.body = jugador;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('jugadores.list', '/', async (ctx) => {
  try {
    const jugadores = await ctx.orm.Jugadores.findAll();
    ctx.body = jugadores;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('jugador.show', '/:id', async (ctx) => {
  try {
    const jugador = await ctx.orm.Jugadores.findOne({ where: { id: ctx.params.id } });
    ctx.body = jugador;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('jugador.delete', '/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const jugador = await ctx.orm.Jugadores.findByPk(id);

    if (jugador) {
      await jugador.destroy();
      ctx.status = 204;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Jugador no encontrado' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;
