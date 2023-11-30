const orm = require('../models');
const { crearJugador, eliminarJugador } = require('./jugadores.controller');

const recursos = [
  { nombreRecurso: 'Oro', tipoRecurso: 'no renovable', bonificacion: 3 },
  { nombreRecurso: 'Plata', tipoRecurso: 'renovable', bonificacion: 2 },
  { nombreRecurso: 'Bronce', tipoRecurso: 'renovable', bonificacion: 1 }];

const crearCasillas = async (cantidad, id_tablero) => {
  for (let i = 0; i < cantidad; i++) {
    const id_recurso = Math.floor(Math.random() * recursos.length) + 1;
    console.log(`id recurso ${id_recurso}`);
    try {
      const response = await fetch('https://web-pirates-api.onrender.com/casillas/casilla.create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idRecurso: id_recurso,
          idTablero: id_tablero,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el casilla');
      }
      const casilla = await response.json();
      console.log('Casilla creada:', casilla);
    } catch (error) {
      console.error('Error al crear la casilla:', error.message);
    }
  }
};

const crearTablero = async (escenario) => {
  try {
    const response = await fetch('https://web-pirates-api.onrender.com/tableros/tablero.create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreEscenario: escenario,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el tablero');
    }

    const tablero = await response.json();
    return tablero;
  } catch (error) {
    console.error('Error al crear el tablero:', error.message);
  }
};

const crearPartida = async (numero_jugadores, id_usuario, escenario, tipo_personaje) => {
  try {
    const tablero = await crearTablero(escenario);
    const casillas = await crearCasillas(25, tablero.id);

    let id_partida;
    try {
      const response = await fetch('https://web-pirates-api.onrender.com/partidas/partida.create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numeroJugadores: numero_jugadores,
          idTablero: tablero.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la partida');
      }

      const partida = await response.json();
      id_partida = partida.id;
    } catch (error) {
      console.error('Error al crear la partida:', error.message);
    }
    const isadmin = true;

    const jugador = await crearJugador(id_usuario, id_partida, tipo_personaje, isadmin);
    return (id_partida);
  } catch (error) {
    console.error('Error al crear la partida:', error.message);
  }
};

const eliminarPartida = async (id_partida) => {
  try {
    const response = await fetch(`https://web-pirates-api.onrender.com/partidas/delete/${id_partida}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al eliminar la partida:', error.message);
  }
};

const eliminarTablero = async (id_tablero) => {
  try {
    const response = await fetch(`https://web-pirates-api.onrender.com/tableros/delete/${id_tablero}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al eliminar el tablero:', error.message);
  }
};

const eliminarCasillas = async (id_casilla) => {
  try {
    const response = await fetch(`https://web-pirates-api.onrender.com/casillas/delete/${id_casilla}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al eliminar la casilla:', error.message);
  }
};

const terminarPartida = async (id_partida) => {
  try {
    const partida_a_eliminar = await orm.Partida.findOne({ where: { id: id_partida } });
    const jugadores_a_eliminar = await orm.Jugadores.findAll({ where: { idPartida: id_partida } });
    const casillas_a_eliminar = await orm.Casillas.findAll({ where: { idPartida: id_partida } });
    for (const jugador of jugadores_a_eliminar) {
      await eliminarJugador(jugador.id);
    }
    await eliminarPartida(id_partida);
    await eliminarTablero(partida_a_eliminar.idTablero);
    for (const casilla of casillas_a_eliminar) {
      await eliminarJugador(casilla.id);
    }
  } catch (error) {
    console.error('Error al terminar la partida:', error.message);
  }
};

module.exports = {
  crearPartida, terminarPartida, eliminarPartida, eliminarTablero, eliminarCasillas,
};
