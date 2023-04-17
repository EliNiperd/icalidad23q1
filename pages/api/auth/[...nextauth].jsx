import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { usegetPool, typeParameter } from 'lib/database/connection';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          //const poolSql = await getPool("default");
          const typeParam = await typeParameter();
          //console.log(typeParam);
          const pool = await usegetPool("Default");
          
          const request = await pool.request();
          await request.input("p_UserName",
            typeParam.NVarChar(20),
            credentials.email
          );
          await request.input("p_Password",
            typeParam.NVarChar(20),
            credentials.password
          );
          const result = await request.execute("PV_Gen_TEmpleadoLogin");
          
          const { rowsAffected , recordset } = result;
          if (rowsAffected > 0) {
            //console.log(result)
            //return result;
            const recordSet = recordset[0];
            //console.log(recordSet)
            //return result.recordset[0]
            return {
              id: recordSet.IdEmpleado,
              username: recordSet.UserName,
              email: recordSet.Correo,
              name: recordSet.NombreEmpleado,
              image: recordSet.ImageEmpleado,
              nombreRol: recordSet.NombreRol,
              idRol: recordSet.IdRol,
              status: 200,
            //  result: "login succesfully",
            //  error: null,
            }
            /*return { user:{
              status: 200,
              id: recordSet.IdEmpleado,
              username: recordSet.UserName,
              email: recordSet.Correo,
              name: recordSet.NombreEmpleado,
              result: "login succesfully",
              error: null,}
            }*/
          } else
            throw new Error(
              "No user Found user with Email or Password, please Sign Up...!"
            );
        } catch (error) {
            console.log(error);
          //return error;
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 60 * 60 * 24 * 30,
    // You can define your own encode/decode functions for signing and encryption
    //async encode() {},
    //async decode() {},
  },
  session: {
    strategy: "jwt",
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    //maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: (1 * 60 * 60), // 1 hr

    updateAge: 1 * 60 * 60,
    
    /*global randomUUID, randomBytes */
    /*generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }*/
  },
  
  callbacks: {
     async jwt ({ token, user }) {
      //console.log('User in jwt:', user)
       if (user) {
         token.id = user.id;
         token.name = user.name;
         token.email = user.email;
         token.image = user.image;
         token.idRol = user.idRol;
         token.nombreRol = user.nombreRol;
         //token.result = user.result;
         token.token = user.token;
       }
       return token;
     },
     async session({session, token}){
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.idRol = token.idRol
      session.user.nombreRol = token.nombreRol
      /*.split(' ')
      .join('')
      .toLocaleLowerCase()

      session.user.uid = token.sub*/

      return session
     },
     /*authorize({req, token}){
      if(token) return token
     }
    },
    pages:{
      signIn: 'index'
    }*/
  },
});



//import { NextAuthOptions } from "next-auth";
//import { data } from "autoprefixer";
//import NextAuth from "next-auth";
//import CredentialsProvider from "next-auth/providers/credentials";
//import GoogleProvider from 'next-auth/providers/google';
//import axios from "axios";
//import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";

/*export const authOptions = {
  session: {
    strategy: "jwt",
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    //maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 2 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        //console.log('email, nextauth: ', email);
        //try {
        const axiosInstance = axios.create({
          baseURL: `http://localhost:3000/`,
        });

        const resp = await axiosInstance
          .get("/api/User", {
            params: {
              email: credentials.email,
              password: credentials.password,
            },
          })
          .then(function (resp) {
           //hmeqc841
           //banco31*
           console.log(resp.data[0]);
           return resp.data[0];
           */
            /*if (email !== resp.data.correo || password !== resp.data.password) {
              return {
                status: 401,
                id: 0,
                username: null,
                email: null,
                name: null,
                result: "favor de verificar correo o contraseña incorrectos",
                error: "Unautorized",
              }
            } else {
              return {
                status: 200,
                id: resp.data.IdEmpleado,
                username: resp.data.UserName,
              //  email: resp.data.Correo,
                name: resp.data.NombreEmpleado,
              //  result: "login succesfully",
              //  error: null,
              }
            } //req.status(500).json({result: 'verify email or password'})*/
          /*})
          .catch(function (error) {
            console.log('su maldito error: no dice nada ', error);
          })
          .then(function () {
            console.log('aquí finaliza');
            // always executed
          });
        //const resp = await fetch('https://jsonplaceholder.typicode.com/users/9');
        //const respD =  JSON.stringify(resp.data);

        //throw new Error("Permiso no autorizado");
        //return { id: '123', name: 'Elí Rodríguez'}
        //data = {status: 200, id: '123', name: 'Elí Rodríguez', result: 'login succesfully', error: null}
        //console.log('email: ', email, 'password: ', password, data)
        //return data;//{status: 200, data: data, result: 'login succesfully', error: 'fatal' }
        //req.status(200).json({data: data, result: 'login succesfully', error: 'fatal' })
        //response => {
        //  response.pipe({
        //      data: data,
        //      result: 'login successfully'
        //  });
        //return //res.status(200).end();
        //}
// Auditoría 54 
        //console.log('email: ', email, 'password: ', password, data)
        //return data;//{status: 200, data: data, result: 'login succesfully', error: 'fatal' }
        //data = {status: 500, result: 'verify email or password', error: 'verify email or password'}
        //console.log('email: ', email, 'password: ', password, data)
        //return data; //{ error: 'Verifica tu usuario o contraseña'};
        //} catch (error) {
        //  data = {status: 401, result: 'verify internal error', error: error}
        //  return data; //{ error: 'Verifica tu usuario o contraseña'};
        //req.status(401).json({result: 'verify internal error'})
        //return {error: 'se generó un error interno'}
        //}
      },
    }),
  ],
  pages: {
    //sigIn: "/",
  },
  callbacks: {
   async session ({session, token}) {
    console.log('aquí por lo mensos?',  session);
    
      return session;
    },
    async jwt ({ token, user }) {
     
      if (user) {
        token.userid = user.id;
        token.name = user.username;
        token.result = user.result;
        token.token = user.token;
      }
      return token;
    },
    
    secret: "test",
    site: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
};
export default NextAuth(authOptions);
*/
/*
export default (req, res) =>
NextAuth(req, res, {
    providers: [
      CredentialsProvider({
            authorize: async (credentials) => {
                try {
                    const data = {
                      
                        email: credentials.email,
                        password: credentials.password
                    }
                    console.log('email: ', credentials.email)
                    console.log('password: ', credentials.password)
                    const user = await login(data);
                    console.log("401 Error",user.data);
                    if (user.data.status==200) {
                        console.log("200 data",user.data);
                         return Promise.resolve(user.data);
                      }else if(user.data.status==401){
                         
                      }
                } catch (error) {
                    if (error.response) {
                        console.log(error.response);
                        Promise.reject(new Error('Invalid Username  and Password combination'));
                    }
                }     
            },
             

        })
    ],
    pages: {
      signIn: '/login',
    },
    callbacks: {
        jwt: async ({token,user})=>{
            
            if(user){
                token.userid = user.id; 
                token.name = user.username;
                token.token = user.token;
            }
            return token;
        },
        session: (session,token)=>{
            return session;  
        }
      },
      secret:"test",
      jwt:{
          secret:"test",
          encryption:true,
      },
    site: process.env.NEXTAUTH_URL || "http://localhost:3000",
    session: {
        jwt: true, 
        maxAge: 1 * 3 * 60 * 60, // 3 hrs
        updateAge: 24 * 60 * 60, // 24 hours
      }

});

 const login = async data => {
     
var config = {
    headers: {
        'Content-Type': "application/json; charset=utf-8",
        'corsOrigin': '*',
        "Access-Control-Allow-Origin": "*"
    }
};
const url = 'api/auth/login';
const result = await axios.post(url,data,config);
return result;

};

*/

/*

const login = async data => {
    var config = {
        headers: {
            'Content-Type': "application/json; charset=utf-8",
            'corsOrigin': '*',
            "Access-Control-Allow-Origin": "*"
        }
    };
    const url = remote_user_url;
    const result = await axios.post(url, data, config);
    console.log('result', result);

    const result = await fetch('https://jsonplaceholder.typicode.com/users/1');
    console.log('result', result);
    return result;
};
*/
/*
const login = async data => {
     
  var config = {
      headers: {
          'Content-Type': "application/json; charset=utf-8",
          'corsOrigin': '*',
          "Access-Control-Allow-Origin": "*"
      }
  };
  const url = 'api/auth/login';
  const result = await axios.post(url,data,config);
  return result;
  
  };
*/
/*, {

/*
import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default async function auth(req, res) {({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johnd@test.com",
        },
        password: { label: "Password", type: "password" },
      },
    })
  ],
  callbacks: {
    async signIn() {
      const isAllowedToSignIn = true
      console.log(req)
      if (isAllowedToSignIn) {
        switch (req.method) {
          case "POST":
              try {
                  const bodyJson = req.body
                  const username = bodyJson.username
                  const password = bodyJson.password
  
                  const resp = await fetch('https://jsonplaceholder.typicode.com/users/1');
                  const data = await resp.json();
                  if (username === data.username && password === data.username) {
                      console.log('login successfully')
                      response => {
                          response.pipe({
                              data: data,
                              result: 'login successfully'
                          });
                          //router.push('/dasboard');
                          navigate
                          return '/dasboard'
                          return res.status(200).end();
                          
                          //resolve()
                      }
                  }
                  else {
                      response => {
                          response.pipe({
                              data: null,
                              result: 'incorrect login'
                          });
                          return res.status(304).end();
                          //resolve()
                      }
                  }
              }
              //console.log('successful login')
              //else
              //    console.log('incorrect login')
              catch (error) {
                  //coneole.log(error); // Can be a simple console.error too
                  return res.status(500).end();
                  //return resolve()
  
  
              }
              
              return res.status(200).end();
              //return resolve()
  
  
  
          //if (req.method === 'POST') {
  
          //}
          //console.log('email: ', data.email, 'name: ', data.name)
  
          //return res.data
          //return bodyJson
          
          //    return await NextAuth(req, res, {
           //       user: res.data
          //      })
          
      }
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  }

})

*/

/*

//import { data } from "autoprefixer";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
//import { getSession } from "next-auth/react";


export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: { label: "Password", type: "password" },
      },
    })
  ],
  callbacks: {
    async signIn ({ user, account, profile, email, credentials })  {
      /*console.log("SignIn Async Here.....");
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        //return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }*/
//return res.status(200).end();
/*},
    pages: {
        signIn: "/api/auth/sigin",
    },
  }
})


*/

//import useSWR from 'swr'

//const fetcher = (url) => fetch(url).then((res) => res.json())
//console.log('error - fetchert');
//const { data, error } = useSWR('../User', fetcher)

/*
    export async function getStaticProps () {
      // `getStaticProps` is executed on the server side.
      console.log('getStaticProps:   ')
      const article = await getArticleFromAPI()
      return {
        props: {
          fallback: {
            'https://jsonplaceholder.typicode.com/users/1': dataUser
          }
        }
      }
    }
    
    function Article() {
      // `data` will always be available as it's in `fallback`.
      const { data } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher)
      console.log(data)
      return data;
    }

*/

/*
    export default function Page({ fallback }) {
      // SWR hooks inside the `SWRConfig` boundary will use those values.
      return (
        <SWRConfig value={{ fallback }}>
          <Article />
        </SWRConfig>
      )
    }*/


