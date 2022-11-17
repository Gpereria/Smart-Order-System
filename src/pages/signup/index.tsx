import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useState, FormEvent, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import logo from '../../../public/Logo2.svg';
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/button';
import { toast } from 'react-Toastify';


export default function SignUp() {

  const { signUp } = useContext(AuthContext); 

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === '' || email === ''){  
      toast.error("XCCC")
      
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    // Cadastro em context
    await signUp(data);

    setLoading(true);
  }

  return (
    <>
      <Head>
        <title>Faça Seu Cadastro Agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="SmartOrder" className={styles.imglogo} />
        
        <div className={styles.singup}>
          <h1 >Criando Sua Conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
            placeholder="Digite Seu Nome"
            type="text"
            value={name}
            onChange={ (e) => setName(e.target.value) }
            />

            <Input
            placeholder="Digite Seu Email"
            type="text"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            />

            <Input
            placeholder="Digite Sua Senha"
            type="password"
            value={password}
            onChange={ (e) => setPassword(e.target.value) }
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>
          <Link href="/" className={styles.textA}>
             Já possui uma conta? Faça Login!
          </Link>
        </div>
      </div>
    </>
  )
}
