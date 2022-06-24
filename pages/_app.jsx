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
      <Component {...pageProps} />
      <Toaster/>
    </AuthProvider>
  );
}
