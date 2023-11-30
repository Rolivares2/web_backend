const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function getJWTScope(token) {
  const secret = process.env.JWT_SECRET;
  const payload = jwt.verify(token, secret);
  return payload.scope;
}

async function isUser(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('usuario'), 403, 'Tu no eres un usuario');
}

async function isAdmin(ctx, next) {
  await next();
  const token = ctx.request.header.authorization.split(' ')[1];
  const scope = getJWTScope(token);
  ctx.assert(scope.includes('admin'), 403, 'Tu no eres un admin');
}

module.exports = {
  isUser, isAdmin,
};
