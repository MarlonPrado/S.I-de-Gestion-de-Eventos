import { findUsuarioByCedula, findUsuarioByEmail, findUsuarioByTelefono, saveUsuario } from "lib/database";

async function handler(req, res) {
  if (req.method == 'POST') {

    try {
      let usuario = await findUsuarioByCedula(req.body.cedula);

      if (usuario) {
        res.status(400).json({ message: "Ya existe un usuario con esta cedula" });
        return;
      }

      usuario = await findUsuarioByEmail(req.body.correo);

      if (usuario) {
        res.status(400).json({ message: "Ya existe un usuario con este correo" });
        return;
      }

      usuario = await findUsuarioByTelefono(req.body.telefono);

      if (usuario) {
        res.status(400).json({ message: "Ya existe un usuario con este telefono" });
        return;
      }

      req.body.rol = "USUARIO";
      await saveUsuario(req.body);
      res.status(200).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Hubo un error en el servidor" });
    }
    return;
  }

  res.status(405).json({ message: "Metodo no permitido" });
}

export default handler;
