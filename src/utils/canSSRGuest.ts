import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { parseCookies } from "nookies";

// Função para paginas de vititas

export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (ctx:GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> =>{

        const cookies = parseCookies(ctx);

        if(cookies['@smartorder.token']){
            return {
                redirect:{
                    destination:'/dashboard',
                    permanent:false
                }
            }
        }

        return await fn(ctx);
    }
}