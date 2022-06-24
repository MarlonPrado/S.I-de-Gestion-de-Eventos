import { useAuth } from 'context/Auth';

function Navbar() {
  const { user, signinWithGoogle, signout } = useAuth();

  return (
    <div className="navbar bg-dark">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          <img
            src="/logoufps.png"
            height="75"
            className="d-inline-block align-top"
            alt="Universidad Francisco de Paula Santander"
          />
        </a>
        {user ? (
          <div className="dropdown">
            <button
              className="btn btn-outline-light dropdown-toggle"
              type="button"
              id="dropdownUser"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-2 d-inline-block fw-bold">
                {user.displayName}
              </span>
              <img src={user.photoURL} className="rounded-circle" height="50" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownUser">
              <li>
                <button className="dropdown-item" onClick={() => signout()}>
                  Salir
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-link link-light"
              onClick={() => signinWithGoogle()}
            >
              Ingresar
            </button>
            <a
              href="/registrar"
              className="btn btn-link link-light"
            >
              Registrarse
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
