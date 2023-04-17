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
              JSON.stringify({message: "Por favor, verifica tu usuario o contraseña"})
            );
        } catch (error) {
            //console.log(error);
            throw new Error(JSON.stringify({message: "Existe un error al intentar validar tus credenciales: " + error.message }));
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



