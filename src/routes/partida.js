const Router = require('koa-router');

const router = new Router();
const { crearPartida, terminarPartida } = require('../controllers/partida.controller');

const recursos = [
  { nombreRecurso: 'Oro', tipoRecurso: 'no renovable', bonificacion: 3 },
  { nombreRecurso: 'Plata', tipoRecurso: 'renovable', bonificacion: 2 },
  { nombreRecurso: 'Bronce', tipoRecurso: 'renovable', bonificacion: 1 }];

router.post('partida.crear', '/partida.crear', async (ctx) => {
  try {
    const partida = await crearPartida(
      parseInt(ctx.request.body.numero_jugadores),
      ctx.request.body.id_usuario,
      ctx.request.body.escenario,
      ctx.request.body.tipo_personaje,
    );
    console.log(`${ctx.request.body.numero_jugadores} y ${ctx.request.body.id_usuario} y ${ctx.request.body.escenario} y ${ctx.request.body.tipo_personaje}`);
    ctx.body = { idPartida: partida, message: 'Partida creada correctamente' };
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('partida.eliminar', '/partida.terminar', async (ctx) => {
  try {
    console.log(ctx.request.body.id_partida);
    const partida = await terminarPartida(parseInt(ctx.request.body.id_partida));
    ctx.body = { message: 'Partida eliminada correctamente' };
    ctx.status = 204;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.post('partida.create', '/partida.create', async (ctx) => {
  try {
    const partida = await ctx.orm.Partida.create(ctx.request.body);
    ctx.body = partida;
    ctx.status = 201;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('partidas.list', '/', async (ctx) => {
  try {
    const partidas = await ctx.orm.Partida.findAll();
    ctx.body = partidas;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.get('partida.show', '/:id', async (ctx) => {
  try {
    const partida = await ctx.orm.Partida.findOne({ where: { id: ctx.params.id } });
    ctx.body = partida;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('partida.delete', '/delete/:id', async (ctx) => {
  try {
    const { id } = ctx.params;
    const partida = await ctx.orm.Partida.findByPk(id);

    if (partida) {
      await partida.destroy();
      ctx.status = 200;
    } else {
      ctx.status = 404;
      ctx.body = { message: 'Partida no encontrada' };
    }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.get('partida.listPlayers', '/datosPartida/:id', async (ctx) => {
  try {
    const partidaId = ctx.params.id;
    const partida = await ctx.orm.Partida.findByPk(partidaId, { attributes: ['id', 'idTablero'] });
    const tablero = await ctx.orm.Tableros.findByPk(partida.idTablero, { attributes: ['nombreEscenario'] });
    console.log(partida);
    const jugadoresPartida = await ctx.orm.Jugadores.findAll({
      where: { idPartida: partidaId },
      attributes: ['id', 'idUsuario', 'tipoPersonaje', 'is_admin'],
      include: [
        { model: ctx.orm.Usuarios, attributes: ['nombreUsuario'] },
      ],
    });

    const datosPartida = {
      partida: partida.toJSON(),
      tablero: tablero.toJSON(),
      jugadores: jugadoresPartida.map((jugador) => jugador.toJSON()),
    };
    ctx.body = datosPartida;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('partida.banear', '/banear/:id', async (ctx) => {
  try {
    const { id } = ctx.params;

    const jugador = await ctx.orm.Jugadores.findOne({
      where: { id },
      attributes: ['id', 'idUsuario', 'tipoPersonaje', 'is_admin'],
    });

    console.log(jugador);

    if (jugador.is_admin === true) {
      ctx.status = 403;
      ctx.body = { message: 'No se puede banear a un administrador' };
    } else {
      console.log(`ID A BANEAR: ${id}`);
      await jugador.destroy();
      ctx.status = 204;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;
