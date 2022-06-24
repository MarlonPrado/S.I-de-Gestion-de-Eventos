import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from 'lib/firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getAuth(app).onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const handleUser = async (user) => {
    if (user === null) {
      setUser(null);
      setLoading(false);
      return null;
    }

    fetch('/api/ingresar', {
      headers: {
        token: user.accessToken
      }
    })
      .then(async (res) => {
        if(!res.ok) {
          signout();
          toast.error("Esta cuenta no está registrada en el sistema");
        }

        const json = await res.json();
        user = {...user, rol: json.rol, cedula: json.cedula};

        setUser(user);
        setLoading(false);
        return user;
      })
      .catch(() => {
        signout();
        toast.error("Esta cuenta no está registrada en el sistema");
      })
  };

  const signout = () => {
    return getAuth(app)
      .signOut()
      .catch(console.error)
      .finally(() => handleUser(null));
  }

  const signinWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  const value = {
    user,
    loading,
    signinWithGoogle,
    signout
  }

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  )
}

export function useAuth() {
  return useContext(authContext);
}
