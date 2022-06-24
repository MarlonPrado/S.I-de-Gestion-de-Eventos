import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ViewNoUser() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('/api/eventos/vigentes', {
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
  }, []);

  return (
    <div className="container-fluid">

      <div className="row py-4 justify-content-center">
        <h1 className='text-center mb-4'>Eventos vigentes</h1>
        {eventos.map((evento) => (
          <div
            className="col col-10 d-flex justify-content-end"
            key={evento.id}
          >
            <div className="card mb-4 w-100">
              <div className="card-body">
                <h5 className="card-title">{evento.nombre}</h5>
                <p>{evento.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewNoUser;
