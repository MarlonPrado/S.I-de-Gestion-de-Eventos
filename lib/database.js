import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

pool
  .getConnection()
  .then(conn => console.log("Conexion exitosa a la base de datos"))
  .catch((err) => console.error(err));

export async function obtenerEventos() {
  const [rows] = await pool.execute('SELECT * FROM eventos ORDER BY id DESC');
  return rows;
}

export async function findEventoAndInscritos(id) {
  const [rows] = await pool.execute('SELECT * FROM eventos WHERE id = ?', [id]);
  const evento = rows[0];

  const [inscritos] = await pool.execute(`
    SELECT u.* from usuarios u 
    inner join inscripciones i ON u.cedula = i.cc_usuario 
    where i.id_evento = ?
  `, [id]);

  evento.inscritos = inscritos;
  return evento;
}

export async function registrarEvento(evento) {
  const [rows] = await pool.query('INSERT INTO eventos SET ?', [evento]);
  return rows[0];
}

export async function findUsuarioByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [email]);
  return rows[0];
}

export async function findUsuarioByCedula(cedula) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
  return rows[0];
}

export async function findUsuarioByTelefono(telefono) {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE telefono = ?', [telefono]);
  return rows[0];
}

export async function saveUsuario(usuario) {
  const [rows] = await pool.query('INSERT INTO usuarios SET ?', [usuario]);
  return rows[0];
}

export async function findAllEventosVigentes() {
  const [rows] = await pool.query(`
    SELECT * from eventos e 
    WHERE DATE(CONVERT_TZ(NOW(), '+00:00', '-05:00')) < fechaf
    order by e.id desc
  `);

  return rows;
}

export async function findAllEventosVigentesAndInscripcion(correo) {
  const [rows] = await pool.query(`
    SELECT * from eventos
    WHERE
      DATE(CONVERT_TZ(NOW(), '+00:00', '-05:00')) < fechaf
    order by id desc
  `, [correo]);

  for (const iterator of rows) {
    const [inscripcion] = await pool.query(`
      SELECT
        *
      from
        inscripciones ins
      inner join usuarios u 
        on
        ins.cc_usuario = u.cedula
      where
        ins.id_evento = ?
        and u.correo = ?
    `, [iterator.id, correo]);

    iterator.inscrito = inscripcion.length !== 0;
  }

  return rows;
}

export async function inscribirEnEvento(inscripcion) {
  const [rows] = await pool.query('INSERT INTO inscripciones SET ?', [inscripcion]);
  return rows[0];
}
