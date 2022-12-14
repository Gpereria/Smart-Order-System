import Head from "next/head";
import { useState,FormEvent } from 'react';
import { Header } from "../../components/Header";
import styles from './styles.module.scss';


import { setupAPIClient } from "../../services/api";
import { toast } from "react-Toastify";

import { canSSRAuth } from "../../utils/canSSRAuth";

export default function Category(){
    const [name,setname] = useState('');

    async function handleRegister(event:FormEvent) {
        event.preventDefault();
        name[0].toUpperCase();
        alert("Categoria " +  name);

        if(name === ''){
            return
        }

        

        const apiClient = setupAPIClient();

        await apiClient.post('category', {
            name:name
        })
        
        toast.success('Categoria Cadastrada Com Sucesso!')
        setname('');
    }



    return(
        <>
        <Head>Categorias VocaMe</Head>

        <div>
            <Header></Header>
            <main className={styles.container}>
                <h1>Casdatrar Categorias</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                    type="text"
                    placeholder="Digite o nome da categoria"
                    className={styles.input}
                    value={name}
                    onChange={ (e) => setname(e.target.value) }
                    />

                    <button type="submit">
                    Cadastrar
                    </button>

                </form>
            </main>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return{
        props:{}
    }
})