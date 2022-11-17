import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/Logo2.svg';
import styles from '../../../styles/home.module.scss';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/button';



export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça Seu Cadastro Agora!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logo} alt="SmartOrder" className={styles.imglogo} />
        
        <div className={styles.singup}>
          <h1 >Criando Sua Conta</h1>
          <form>
            <Input
            placeholder="Digite Seu Nome"
            type="text"
            />

            <Input
            placeholder="Digite Seu Email"
            type="text"
            />

            <Input
            placeholder="Digite Sua Senha"
            type="password"
            />

            <Button
              type="submit"
              loading={false}
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
