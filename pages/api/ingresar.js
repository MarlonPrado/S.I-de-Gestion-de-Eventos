import { findUsuarioByEmail } from "lib/database";
import { auth } from "lib/firebase-admin";

async function handler(req, res) {
  try {
    const decoded = await auth.verifyIdToken(req.headers.token);
    const usuario = await findUsuarioByEmail(decoded.email);

    if(usuario === null) {
      res.status(401).end();
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error en el servidor" });
  }
}

export default handler;
