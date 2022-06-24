import { auth } from "lib/firebase-admin";
import { findAllEventosVigentes, findAllEventosVigentesAndInscripcion } from "lib/database";

async function handler(req, res) {
  try {
    let eventos;

    if (req.headers.token) {
      const { email } = await auth.verifyIdToken(req.headers.token);
      eventos = await findAllEventosVigentesAndInscripcion(email);

    } else {
      eventos = await findAllEventosVigentes();
    }

    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export default handler;
