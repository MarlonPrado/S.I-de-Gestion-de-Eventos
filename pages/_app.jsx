import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from 'context/Auth';
import Navbar from 'components/Navbar';


export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Eventos UFPS</title>
      </Head>
      <Navbar/>
      <div className="container-fluid py-4">
        <Component {...pageProps} />
      </div>
      <Toaster/>
    </AuthProvider>
  );
}
