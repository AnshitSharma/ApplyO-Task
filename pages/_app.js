import Layout from '../components/Layout/Layout';
import { AuthProvider } from '../components/Auth/AuthProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
