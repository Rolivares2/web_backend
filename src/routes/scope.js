const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');

const router = new Router();

router.get('/usuarioprotegido', authUtils.isUser, async (ctx) => {
  ctx.body = {
    message: 'Bienvenido a la ruta protegida con el scope usuario!', usuario: ctx.state.usuario,
  };
});

router.get('/adminprotegido', authUtils.isAdmin, async (ctx) => {
  ctx.body = {
    message: 'Bienvenido a la ruta protegida con el scope admin!', usuario: ctx.state.usuario,
  };
});

module.exports = router;
