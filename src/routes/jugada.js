const Router = require('koa-router');

const router = new Router();
const orm = require('../models');
const { moverJugador } = require('../controllers/jugadores.controller');
const { revisarSalud } = require('../controllers/jugadores.controller');

router.post('/', async (ctx) => {
  try {
    const jugadoresPerdidos = await revisarSalud();
    const { idJugador, casillaFinal } = ctx.request.body;
    const jugadorBdd = await orm.Jugadores.findByPk(idJugador);

    // let jugadorPerdido = false;

    // for (const jugador of jugadoresPerdidos) {
    //   if (jugador.id === idJugador) {
    //     jugadorPerdido = true;
    //     break;
    //   }
    // }
    const jugadorPerdido = jugadoresPerdidos.some((jugador) => jugador.id === idJugador);

    if (jugadorPerdido) {
      ctx.status = 200;
      ctx.body = { message: `El jugador con ID ${idJugador} ha perdido` };
    } else if (jugadorBdd != null) {
      await moverJugador({ idJugador, casillaFinal });
      if (jugadorBdd.puntaje >= 7) {
        ctx.status = 200;
        ctx.body = { message: `¡El jugador con ID ${idJugador} ha ganado!` };
      } else {
        ctx.status = 200;
        ctx.body = { message: 'Jugador movido exitosamente' };
      }
    } else {
      ctx.status = 404;
      ctx.body = { message: 'El jugador no está participando del juego' };
    }
  } catch (error) {
    console.error(error);
    ctx.status = 400;
    ctx.body = { error: 'Error en la solicitud' };
  }
});

module.exports = router;
