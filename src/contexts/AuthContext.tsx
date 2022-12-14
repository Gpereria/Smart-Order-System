import { type } from "os";
import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../services/apiClient";
import { destroyCookie, setCookie,parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-Toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credetials:SignInProps) => Promise<void>
    signOut: () => void;
    signUp: (credetials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email:string;
    password:string;
}

type SignUpProps = {
    email:string;
    name: string;
    password:string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@smartorder.token');
        Router.push('/');
    }catch{
        console.log('Erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [ user,setUser ] = useState<UserProps>();
    const isAuthenticated = !!user;

    //Ciclo de vida da Aplicação
    useEffect(() => {
        // Irá rodar sempre que uma página for gerada

        const { '@smartorder.token':token } = parseCookies();
        if(token){
            api.get('/me').then(response => {
                const { id , name , email } = response.data;
                setUser({
                    id,
                    name,
                    email,  
                })
            })
            .catch(() => {
                    //Em uma irregularidade, deslogar user
                    signOut()
                }
            )

        }

    },[])

    async function signIn( { email , password }: SignInProps ){
        console.log("Dados Para Login:");
        console.log("Email = " + email);
        console.log("Password = " + password);

        try{
            const response = await api.post('/session',{
                email,
                password
            })

            // console.log(response)
            const {id, name, token} = response.data;

            setCookie(undefined,'@smartorder.token', token,{
                maxAge: 60*60*24*30, // Expirar em um mês
                path: "/" // Quais caminhos terão esse cookie
            })

            setUser({
                id,
                name,
                email,
            })

            // Passar para prox req o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;
            
            toast.success('Logado Com Sucesso!!')

            // Redirecionar 
            Router.push('/dashboard');
        }catch(err){
            toast.error("Erro ao acessar")
            console.log("error: ", err);
        }
    }

    async function signUp({ email, name, password }:SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            toast.success("Conta Criada Com Sucesso!")
            Router.push('/');
        } catch (error) {
            toast.error("Erro ao Cadastrar")
            console.log("ERRO: " + error )
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn ,signOut, signUp }} >
            {children}
        </AuthContext.Provider>
    )
}

