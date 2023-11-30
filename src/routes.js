const Router = require('koa-router');
// const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const jugadores = require('./routes/jugadores');
const usuarios = require('./routes/usuarios');
const tableros = require('./routes/tableros');
const partidas = require('./routes/partida');
const recursos = require('./routes/recursos');
const casillas = require('./routes/casillas');
const jugadorrecursos = require('./routes/jugadorrecursos');
const jugada = require('./routes/jugada');
const auth = require('./routes/authentication');
const scope = require('./routes/scope');

const router = new Router();

router.use('/jugadores', jugadores.routes());

router.use('/tableros', tableros.routes());
router.use('/partidas', partidas.routes());
router.use('/recursos', recursos.routes());
router.use('/casillas', casillas.routes());
router.use('/jugadorrecursos', jugadorrecursos.routes());
router.use('/jugada', jugada.routes());
router.use(auth.routes());

// router.use('/usuarios', usuarios.routes());
router.use('/usuarios', usuarios.routes());
// Rutas protegidas
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));

router.use('/scope', scope.routes());

module.exports = router;
