const dtf = Intl.DateTimeFormat('es-CO', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric'
});

function CardEvento({ evento, children }) {
  const fechaInicio = new Date(evento.fechai);
  const fechaFin = new Date(evento.fechaf);

  let badge = 'En curso';

  if (fechaInicio > new Date()) {
    badge = 'Próximo a comenzar';
  } else if (fechaFin < new Date()) {
    badge = 'Finalizado';
  }

  return (
    <div className="col col-10 d-flex justify-content-end">
      <div className="card mb-4 w-100">
        <div className="row">
          <div className="col-4">
            <img
              src={evento.imagen}
              className="img-fluid rounded-start"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-8">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="badge bg-danger mb-2">{badge}</span>
                  <h2 className="card-title">{evento.nombre}</h2>
                  <p>{evento.descripcion}</p>
                  <hr className="text-danger border-2 opacity-50"></hr>
                  <p>
                    <span className="fw-bold">Fecha de inicio:</span>{' '}
                    {dtf.format(fechaInicio)}
                  </p>
                  <p>
                    <span className="fw-bold">Fecha de finalización:</span>{' '}
                    {dtf.format(fechaFin)}
                  </p>
                </div>
                {children && (
                  <div className="col-auto align-self-center">{children}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEvento;
