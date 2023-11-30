const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaLogger = require('koa-logger');
const cors = require('@koa/cors');
const router = require('./routes');
const orm = require('./models');

const app = new Koa();

app.context.orm = orm;

app.use(cors());

app.use(KoaLogger());
app.use(koaBody());
app.use(router.routes());

app.use((ctx) => {
  ctx.body = `
  DOCUMENTACIÓN
  
  Cómo hacer el llamado a la api:
  Ejecutar "yarn dev" en la terminal
  Abrir https://web-pirates-api.onrender.com

  Endpoint: /Usuarios?id={user_id}
  Parámetros:
  id opcional Id del usuario a mostrar.
  Descripción: El método realizará acciones sobre la tabla de usuarios dependiendo del "".
  "GET": Muestra todos los usuarios en la tabla de Usuarios o muestra el usuario del id ingresado en el endpoint.
  "POST" Crea un usuario nuevo con los parámetros entregados por el JSON.
  "DELETE" Elimina al usuario con el id ingresado en el endpoint, no es necesario enviar un JSON.
  JSON
  {
    "nombre_usuario": "web1",
    "correo": "web1@uc.cl",
    "clave": "web123#!"
  }
  Restricciones:
  "clave": Debe ser alfanumérica y con almenos 1 símbolo especial.
  
  Endpoint: /partidas/partida.crear
  Descripción: Crea en cascada las tuplas: casilla, tablero, partida y jugador.
  "POST" 
  JSON 
  {
    'numero_jugadores': 4,
    'id_usuario': 1,
    'escenario': 'isla encantada',
    'tipo_personaje': 1
  }

  Endpoint: /partidas/partida.terminar
  Descripción: El método eliminará en cascada las tuplas: casilla, tablero, partida y jugador.
  "POST"
  JSON
  {
    "id_partida": 1
  }
  
  Endpoint: /casillas/casillas.create
  Descripción: El método creará una casilla en la tabla Casillas.
  "POST"

  JSON:
  {
    "idRecurso": 1,
    "idTablero": 3,
  }
  
  Endpoint: /casillas/id={casilla_id}
  Parámetros:
  id opcional Id de la casilla.
  Descripción: El método mostrará todas las casillas existentes en la tabla Casillas.
  "GET": Muestra todas las casillas existentes
  ""

  Endpoint: /Jugadores?id={player_id}
  Parámetros
  id opcional ID del jugador a mostrar
  Descripción: El método realizará acciones sobre la tabla Jugadores.
  "GET": Muestra todos los usuarios en la tabla de Jugadores o muestra el jugador del id ingresado en el endpoint.
  "POST" Crea un jugador nuevo con los parámetros entregados por el JSON.
  "DELETE" Elimina al jugador con el id ingresado en el endpoint, no es necesario enviar un JSON.
  {
    "id_usuario": 2,
    "id_partida": 1,
    "id_casilla": 1,
    "tipo_personaje": 3,
    "llaveCofre": false,
    "salud": 10,
    "puntaje": 0,
    "is_admin": false
  }

  Endpoint: /Jugada
  "POST" Mueve al jugador i desde su casilla actual hasta su casilla final, restando salud y sumando puntaje en caso de agarrar un recurso.
  {
    "idJugador": 2,
    "casillaFinal": 1
  }
  
  Endpoint: /Tableros?id={player_id}
  "GET" Muestra todos los tableros de la tabla tableros o el tablero con el id ingresado en el endpoint
  "POST" Crea un tablero con el escenario enviado en el JSON. 
  "DELETE" Elimina el tablero con el id ingresado en el endpoint.
  {
    "nombreEscenario": "isla encantada"
  }
  `;
});

app.on('error', (err) => {
  console.log(err);
});

module.exports = app;
