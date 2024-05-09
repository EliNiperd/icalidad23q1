import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { usegetPool, typeParameter } from 'lib/database/connection';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        try {
          // const poolSql = await getPool("default");
          const typeParam = await typeParameter();
          // console.log(typeParam);
          const pool = await usegetPool('Default');

          const request = await pool.request();
          await request.input(
            'p_UserName',
            typeParam.NVarChar(20),
            credentials.email
          );
          await request.input(
            'p_Password',
            typeParam.NVarChar(20),
            credentials.password
          );

          const result = await request.execute('PV_Gen_TEmpleadoLogin');
          // console.log(result, 'user: ', credentials.email, 'password: ', credentials.password);
          const { rowsAffected, recordset } = result;
          // console.log("rows: ", rowsAffected[0], "records: ", recordset[0]);
          if (rowsAffected[0] > 0) {
            // console.log(result)
            // return result;
            const recordSet = recordset[0];
            // console.log(recordSet)
            // return result.recordset[0]

            const user = {
              id: recordSet.IdEmpleado,
              username: recordSet.UserName,
              email: recordSet.Correo,
              name: recordSet.NombreEmpleado,
              image: recordSet.ImageEmpleado,
              nombreRol: recordSet.NombreRol,
              idRol: recordSet.IdRol,
            };

            return Promise.resolve(user);

            /* return { user:{
              status: 200,
              id: recordSet.IdEmpleado,
              username: recordSet.UserName,
              email: recordSet.Correo,
              name: recordSet.NombreEmpleado,
              result: "login succesfully",
              error: null,}
            } */
          } else throw new Error('Por favor, verifica tu usuario o contraseña');
        } catch (error) {
          console.log(error);
          throw new Error('Ocurrió un error: ' + error.message);
          // return error;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,

  jwt: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    maxAge: 1 * 60 * 60,
    // You can define your own encode/decode functions for signing and encryption
    // async encode() {},
    // async decode() {},
  },
  session: {
    strategy: 'jwt',
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 1 * 60 * 60, // 1 hr

    updateAge: 1 * 60 * 60,

    /* globalrandomUUID, randomBytes */
    /* generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    } */
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.idRol = user.idRol;
        token.nombreRol = user.nombreRol;
        token.token = user.token;
        token.uid = user.uid;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // console.log('Session in token:', token)
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.idRol = token.idRol;
      session.user.nombreRol = token.nombreRol;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.token = token.token;
      session.user.uid = token.sub;

      /* session.user.id = token.id
      session.user.uid = token.sub */

      return Promise.resolve(session);
    },
    /* authorize({req, token}){
      if(token) return token
     }
    },
    pages:{
      signIn: 'index'
    } */
  },
});
