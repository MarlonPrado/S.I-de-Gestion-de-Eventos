import { useAuth } from 'context/Auth';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CardEvento from './CardEvento';

function ViewAdmin() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('/api/eventos', {
      headers: {
        contentType: 'application/json'
      }
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setEventos(data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Hubo un error en el servidor.');
      });
  }, [user]);

  return (
   <>
    <h1 className="text-center my-4">Eventos</h1>
      <div className="row justify-content-center text-end">
        <div className="col-10">
          <Link href={'/eventos/nuevo'}>
            <a className="btn btn-danger">Registrar evento</a>
          </Link>
        </div>
      </div>
      <div className="row py-4 justify-content-center">
        {eventos.map((evento) => (
          <CardEvento evento={evento} key={evento.id}>
            <a
              className="btn btn-danger"
              href={'/api/eventos/export?id=' + evento.id}
              target="_blank"
              rel="noopener noreferrer"
            >
              Generar reporte
            </a>
          </CardEvento>
        ))}
      </div>
      </>
  );
}

export default ViewAdmin;
