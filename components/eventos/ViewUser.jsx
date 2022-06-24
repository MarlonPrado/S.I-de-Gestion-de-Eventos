import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from 'context/Auth';
import CardEvento from './CardEvento';

function ViewUser() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, [user]);

  const obtenerEventos = () => {
    fetch('/api/eventos/vigentes', {
      headers: {
        contentType: 'application/json',
        token: user.accessToken
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
  };

  const handleInscripcion = (idEvento) => {
    fetch('/api/eventos/inscripcion', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token: user.accessToken
      },
      body: JSON.stringify({
        id_evento: idEvento,
        cc_usuario: user.cedula
      })
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success('Inscripción realizada con éxito.');
          obtenerEventos();
        } else {
          toast.error('Hubo un error en el servidor.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Hubo un error en el servidor.');
      });
  };

  return (
    <div className="row py-4 justify-content-center">
      <h1 className="text-center mb-4">Eventos</h1>
      {eventos.map((evento) => (
        <CardEvento evento={evento} key={evento.id}>
          {!evento.inscrito && new Date(evento.fechai) > new Date() && (
            <button
              className="btn btn-danger"
              onClick={() => handleInscripcion(evento.id)}
            >
              Inscribirse
            </button>
          )}
        </CardEvento>
      ))}
    </div>
  );
}

export default ViewUser;
