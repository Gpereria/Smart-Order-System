import { useContext, FormEvent, useState } from 'react';

import logo from '../../public/Logo2.svg';
import styles from '../../styles/home.module.scss';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import { GetServerSideProps } from 'next';


import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/button';
import { toast } from 'react-Toastify';


import { AuthContext } from '../contexts/AuthContext';


import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const {signIn} = useContext(AuthContext);

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warn("Preencha os dados");
      return;
    }

    setLoading(true)

    let data ={
      email,
      password
    }

    await signIn(data);

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>SmartOrder - Home</title>
      </Head>
      <div className={styles.containerCenter}>

        <Image src={logo} alt="SmartOrder" className={styles.imglogo} priority={true} />
        <div className={styles.login}>
          <form onSubmit={handleLogin} >
            <Input
            placeholder="Digite Seu Email"
            type="text"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />

            <Input
            placeholder="Digite Sua Senha"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>
          <Link href="/signup" className={styles.textA}>
             Não possui uma conta? Cadastre-se
          </Link>
        </div>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props:{}
    
  }
})
