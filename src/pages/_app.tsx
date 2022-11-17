import  "../../styles/globals.scss";
import { AppProps } from "next/app"

import { ToastContainer } from 'react-Toastify';
import 'react-toastify/dist/ReactToastify.css';


import { AuthProvider } from '../contexts/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3500}></ToastContainer>
    </AuthProvider>
  ) 
}

export default MyApp
