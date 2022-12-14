import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies,destroyCookie } from "nookies";
import { getServerSideProps } from "../pages";
import { AuthTokenError } from "../services/errors/AuthTokenError";


// Só user logado tem acesso

export function canSSRAuth<P>(fn:GetServerSideProps<P>){
        return async (ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

            const cookies = parseCookies(ctx);
            const token = cookies['@smartorder.token']

            if(!token){
                return {
                    redirect:{
                        destination:'/',
                        permanent:false
                    }
                }
            }

            try{
                return await fn(ctx);
            }catch(err){
                if(err instanceof AuthTokenError){
                    destroyCookie(ctx,'@smartorder.token')

                    return {
                        redirect:{
                            destination:'/',
                            permanent:  false
                        }
                    }
                }
            }

        }
}