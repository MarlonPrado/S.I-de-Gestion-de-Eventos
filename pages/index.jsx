import { useAuth } from 'context/Auth';
import ViewNoUser from 'components/eventos/ViewNoUser';
import ViewUser from 'components/eventos/ViewUser';
import ViewAdmin from 'components/eventos/ViewAdmin';

function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="row justify-content-center">
      <div className="col-auto align-self-center">
        <span>Cargando...</span>
      </div>
    </div>;
  }

  if(user === null || !user.rol) {
    return <ViewNoUser />;
  }

  if(user.rol === "USUARIO") {
    return <ViewUser />;
  }

  return <ViewAdmin/>;
}

export default HomePage;
