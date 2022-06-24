import { useState } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import toast from 'react-hot-toast';

function NuevoEvento() {
  const [urlImagen, setUrlImagen] = useState('');

  const [fechaInicio, setFechaInicio] = useState(
    new Date().toISOString().split('T')[0]
  );

  const handleChangeFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    fetch('/api/eventos', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        toast.success('Evento creado correctamente');
        Router.push('/')
      })
      .catch((err) => console.error(err));
  };

  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'kristiandrex',
        uploadPreset: 'nvaepv7a'
      },
      (error, result) => {
        if (
          result.event === 'success' &&
          result.info.resource_type === 'image'
        ) {
          setUrlImagen(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  return (
    <>
      <Head>
        <script src="https://upload-widget.cloudinary.com/global/all.js"></script>
      </Head>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Registrar evento</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <h5>Nombre del Evento</h5>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h5>Fecha de Inicio</h5>
                  <input
                    type="date"
                    className="form-control"
                    name="fechai"
                    required
                    min={fechaInicio}
                    value={fechaInicio}
                    onChange={handleChangeFechaInicio}
                  />
                </div>
                <div className="form-group mb-4">
                  <h5>Fecha de Fin</h5>
                  <input
                    type="date"
                    className="form-control"
                    name="fechaf"
                    required
                    min={fechaInicio}
                  />
                </div>
                <div className="form-group mb-4">
                  <h5>Descripcion del evento</h5>
                  <textarea
                    className="form-control"
                    required
                    name="descripcion"
                  ></textarea>
                </div>
                <div className="form-group mb-4">
                  <h5>Tipo de Evento</h5>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tipo"
                      id="tipoNacional"
                      value={'nacional'}
                      required
                    />
                    <label className="form-check-label" htmlFor="tipoNacional">
                      Nacional
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tipo"
                      id="tipoInternacional"
                      value={'internacional'}
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="tipoInternacional"
                    >
                      Internacional
                    </label>
                  </div>
                </div>
                {urlImagen && (
                  <>
                    <img src={urlImagen} className='img-thumbnail mb-2' />
                  </>
                )}
                <div className="form-group mb-4 text-center">
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={handleUpload}
                  >
                    Subir imagen
                  </button>
                  <input
                    type="text"
                    className="form-control"
                    name="imagen"
                    required=""
                    placeholder="URL de la imagen"
                    hidden
                    value={urlImagen}
                    readOnly
                  />
                </div>
                <hr />
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-danger btn-block">
                    Registrar evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NuevoEvento;
