import { findEventoAndInscritos } from "lib/database";
import carbone from "carbone";
import { promisify } from 'util'
import { randomUUID } from "crypto";

async function handler(req, res) {
  try {
    const { id } = req.query;
    const evento = await findEventoAndInscritos(id);
    const render = promisify(carbone.render)

    const buffer = await render('template.xlsx', evento)

    res.writeHead(200, {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Length': buffer.length,
      "Content-Disposition": "attachment;filename=inscritos-" + randomUUID() + ".xlsx"
    });

    res.write(buffer);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export default handler;
