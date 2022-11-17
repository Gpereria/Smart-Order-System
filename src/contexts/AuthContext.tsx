import { type } from "os";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/apiClient";
import { destroyCookie, setCookie,parseCookies } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credetials:SignInProps) => Promise<void>
    signOut: () => void;
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

            // Redirecionar 
            Router.push('/dashboard');
        }catch(err){

        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn ,signOut }} >
            {children}
        </AuthContext.Provider>
    )
}

