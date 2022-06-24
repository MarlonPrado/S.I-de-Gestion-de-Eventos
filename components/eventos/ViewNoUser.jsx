import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CardEvento from 'components/eventos/CardEvento';

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
    <div className="row py-4 justify-content-center">
      <h1 className="text-center mb-4">Eventos</h1>
      {eventos.map((evento) => (
        <CardEvento evento={evento} key={evento.id} />
      ))}
    </div>
  );
}

export default ViewNoUser;
