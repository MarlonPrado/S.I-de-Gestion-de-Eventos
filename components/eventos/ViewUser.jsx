import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from 'context/Auth';

function ViewUser() {
  const { user } = useAuth();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    obtenerEventos();
  }, []);

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
    <div className="container-fluid">
      <div className="row py-4 justify-content-center">
        <h1 className="text-center mb-4">Eventos vigentes</h1>
        {eventos.map((evento) => (
          <div
            className="col col-10 d-flex justify-content-end"
            key={evento.id}
          >
            <div className="card mb-4 w-100">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h5 className="card-title">{evento.nombre}</h5>
                    <p>{evento.descripcion}</p>
                  </div>
                  {!evento.inscrito ? (
                    <div className="col-auto align-self-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleInscripcion(evento.id)}
                      >
                        Inscribirse
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewUser;
