import Router from 'next/router';
import toast from 'react-hot-toast';

function RegistroPage() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    fetch('/api/registrar', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        if (res.ok) {
          toast.success('Usuario registrado correctamente');
          Router.push('/');
          return;
        }

        console.error(res);

        const json = await res.json();
        toast.error(json.message);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="text-center">Registrarse</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <h6>Cedula</h6>
                  <input
                    type="text"
                    className="form-control"
                    name="cedula"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Nombres</h6>
                  <input
                    type="text"
                    className="form-control"
                    name="nombres"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Apellidos</h6>
                  <input
                    type="text"
                    className="form-control"
                    name="apellidos"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Correo</h6>
                  <input
                    type="email"
                    name="correo"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Telefono</h6>
                  <input
                    type="text"
                    name="telefono"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Carrera</h6>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="INGENIERIA DE SISTEMAS"
                    name="carrera"
                  />
                </div>
                <div className="form-group mb-4">
                  <h6>Semestre</h6>
                  <input
                    type="number"
                    className="form-control"
                    name="semestre"
                    required
                    placeholder="1"
                    min={1}
                    max={10}
                  />
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-danger btn-block">
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default RegistroPage;
