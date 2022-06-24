import { useAuth } from 'context/Auth';
import ViewNoUser from 'components/eventos/ViewNoUser';
import ViewUser from 'components/eventos/ViewUser';
import ViewAdmin from 'components/eventos/ViewAdmin';

function HomePage() {
  const { user } = useAuth();

  if(user === null) {
    return <ViewNoUser />;
  }

  if(user.rol === "USUARIO") {
    return <ViewUser />;
  }

  return <ViewAdmin/>;
}

export default HomePage;
