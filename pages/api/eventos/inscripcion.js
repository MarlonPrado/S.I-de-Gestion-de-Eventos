import { inscribirEnEvento } from "lib/database";
import { auth } from "lib/firebase-admin";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const decoded = await auth.verifyIdToken(req.headers.token);
      await inscribirEnEvento(req.body);

      if (decoded === null) {
        res.status(401).end();
        return;
      }

      res.status(200).json({ message: "Inscripción realizada con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

export default handler;
