const Router = require('koa-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();

const router = new Router();

router.post('authentication.signup', '/signup', async (ctx) => {
  const authInfo = ctx.request.body;

  let usuario = await ctx.orm.Usuarios.findOne({ where: { correo: authInfo.correo } });
  if (usuario) {
    ctx.body = `El usuario con el mail '${authInfo.correo}' ya existe :(`;
    ctx.status = 400;
    return;
  }

  const usuario_nombre = await ctx.orm.Usuarios.findOne({
    where: { nombreUsuario: authInfo.nombreUsuario },
  });
  if (usuario_nombre) {
    ctx.body = `El usuario con el nombre '${authInfo.nombreUsuario}' ya existe :(`;
    ctx.status = 400;
    return;
  }

  try {
    function isValidPassword(value) {
      console.log(value);
      console.log('revisando clave');
      if (!value.match(/[a-z]/) || !value.match(/[0-9]/) || !value.match(/[@$!%*#?&]/)) {
        throw new Error('La clave debe tener al menos una letra, un número y un caracter especial');
      }
    }
    isValidPassword(authInfo.clave);

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(authInfo.clave, saltRounds);
    usuario = await ctx.orm.Usuarios.create({
      nombreUsuario: authInfo.nombreUsuario,
      correo: authInfo.correo,
      clave: hashPassword,
    });
  } catch (error) {
    ctx.body = error.message;
    console.log(error);
    ctx.status = 400;
    return;
  }
  ctx.body = { message: 'Usuario registrado exitosamente', model: usuario };
  ctx.status = 201;
});

router.post('authentication.login', '/login', async (ctx) => {
  let usuario;
  const authInfo = ctx.request.body;
  try {
    usuario = await ctx.orm.Usuarios.findOne({ where: { nombreUsuario: authInfo.nombreUsuario } });
    console.log('PROBANDO');
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    return;
  }
  if (!usuario) {
    ctx.body = `El usuario con el mail '${authInfo.correo}' no existe`;
    ctx.status = 400;
    return;
  }

  console.log(usuario.clave);
  console.log(authInfo.clave);

  const validPassword = await bcrypt.compare(authInfo.clave, usuario.clave);

  if (validPassword) {
    ctx.body = {
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
    };
    ctx.status = 200;
  } else {
    ctx.body = 'Clave incorrecta';
    ctx.status = 400;
    return;
  }

  const expirationSeconds = 1 * 60 * 60 * 24;
  const JWT_PRIVATE_KEY = process.env.JWT_SECRET;
  const token = jwt.sign(
    { scope: ['usuario'] },
    JWT_PRIVATE_KEY,
    { subject: usuario.id.toString() },
    { expiresIn: expirationSeconds },
  );
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
    expires_in: expirationSeconds,
    model: usuario,
  };
  ctx.status = 200;
});

module.exports = router;
