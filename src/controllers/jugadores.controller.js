const orm = require('../models');
// const { recursos } = require('../routes/partida.js');

// const getJugadores = async (ctx) => {
//   const jugadores = await orm.Jugadores.findAll();
//   return jugadores;
// };

// const { Casillas } = require('../models/casillas');

const recursos = [
  { nombreRecurso: 'Oro', tipoRecurso: 'no renovable', bonificacion: 3 },
  { nombreRecurso: 'Plata', tipoRecurso: 'renovable', bonificacion: 2 },
  { nombreRecurso: 'Bronce', tipoRecurso: 'renovable', bonificacion: 1 }];

const crearJugador = async (id_usuario, id_partida, tipo_personaje, isadmin) => {
  try {
    // const casilla_inicio = Math.floor(Math.random() * 25);
    const response = await fetch('http://localhost:3000/jugadores/jugador.create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario: id_usuario,
        idPartida: id_partida,
        idCasilla: 75,
        tipoPersonaje: tipo_personaje,
        is_admin: isadmin,
        llaveCofre: false,
        salud: 100,
        puntaje: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear el jugador');
    }

    const jugador = await response.json();
    return jugador;
  } catch (error) {
    console.error('Error al crear el jugador:', error.message);
  }
};

const eliminarJugador = async (id_jugador) => {
  try {
    const response = await fetch(`http://localhost:3000/jugadores/delete/${id_jugador}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error al eliminar el jugador:', error.message);
  }
};

const recolectarRecurso = async (ctx) => {
  const { idJugador } = ctx;

  try {
    const jugador = await orm.Jugadores.findByPk(idJugador);

    if (!jugador) {
      ctx.status = 404;
      ctx.body = { error: 'No se encontró el jugador' };
    } else {
      const casilla = await orm.Casillas.findByPk(jugador.idCasilla);
      const recurso = recursos[casilla.idRecurso];

      if (!casilla.idRecurso) {
        ctx.body = { message: 'No hay recursos para recolectar' };
      } else {
        jugador.puntaje += recurso.bonificacion;
        jugador.salud -= 5;
        ctx.body = { message: `Jugador recolectó el recurso exitosamente, ganó ${recurso.bonificacion} puntos y perdió 5 de salud` };
        if (recurso.tipoRecurso === 'no renovable') {
          casilla.idRecurso = null;
        }
      }
      await jugador.save();
      await casilla.save();
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Error interno del servidor' };
  }
};

const moverJugador = async (ctx) => {
  const { idJugador, casillaFinal } = ctx;

  try {
    const jugador = await orm.Jugadores.findByPk(idJugador);

    if (!jugador) {
      ctx.status = 404;
      ctx.body = { error: 'No se encontró el jugador' };
    } else {
      jugador.idCasilla = casillaFinal;
      jugador.salud -= 5;
      await jugador.save();
      ctx.status = 200;
      ctx.body = { message: 'Jugador movido exitosamente y perdió 10 de salud' };
      await recolectarRecurso({ idJugador });
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Error interno del servidor' };
  }
};

const revisarSalud = async () => {
  const jugadoresPerdidos = [];
  try {
    const jugadores = await orm.Jugadores.findAll();

    // if (jugadores) {
    //   for (const jugador of jugadores) {
    //     if (jugador.salud <= 0) {
    //       jugadoresPerdidos.push(jugador);
    //       jugador.destroy();
    //     } else {
    //       jugador.save();
    //     }
    //   }
    // }
    if (jugadores) {
      jugadores.forEach((jugador) => {
        if (jugador.salud <= 0) {
          jugadoresPerdidos.push(jugador);
          jugador.destroy();
        } else {
          jugador.save();
        }
      });
    }
  } catch (error) {
    console.error(error);
  }

  return jugadoresPerdidos;
};

module.exports = {
  moverJugador, recolectarRecurso, revisarSalud, crearJugador, eliminarJugador,
};
