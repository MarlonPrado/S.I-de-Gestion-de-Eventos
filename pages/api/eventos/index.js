import { obtenerEventos, registrarEvento } from "lib/database";

async function handler(req, res) {
  if (req.method === "GET") {
    const eventos = await obtenerEventos();
    res.json(eventos);
    return;
  }
  
  if (req.method === "POST") {
    await registrarEvento(req.body);
    res.status(201).end();
  }
}

export default handler;
