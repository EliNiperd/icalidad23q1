import { handlers } from "@/auth"
export const { GET, POST } = handlers

/* import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { usegetPool, typeParameter } from '@/lib/database/connection';
import { authConfig } from '@/auth.config';

async function getUser(email, password) {
    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');

        const request = await pool.request();
        await request.input('p_UserName', typeParam.NVarChar(20), email);
        await request.input('p_Password', typeParam.NVarChar(20), password);

        const result = await request.execute('PV_Gen_TEmpleadoLogin');
        const { rowsAffected, recordset } = result;
        if (rowsAffected[0] > 0) {
            const recordSet = recordset[0];
            const user = {
                id: recordSet.IdEmpleado,
                username: recordSet.UserName,
                email: recordSet.Correo,
                name: recordSet.NombreEmpleado,
                image: recordSet.ImageEmpleado,
                nombreRol: recordSet.NombreRol,
                idRol: recordSet.IdRol,
                password,
            };
            return user;
        } else throw new Error('Por favor, verifica tu usuario o contraseña');
    } catch (error) {
        console.error('Ocurrió un error: ' + error.message, error);
        throw new Error('Ocurrió un error: ' + error.message);
    }
}

const authOptions = {
    ...authConfig,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Correo' },
                password: { label: 'Password', type: 'password' }
            },
            authorize: async (credentials) => {
                const user = await getUser(credentials.email, credentials.password);
                if (!user) return null;
                if (
                    credentials.password.toString().trim() ===
                    user.password.toString().trim()
                ) {
                    return user;
                } else {
                    console.log('User not found');
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.nombreRol = user.nombreRol;
                token.idRol = user.idRol;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.nombreRol = token.nombreRol;
            session.user.idRol = token.idRol;
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/auth/signout',
        error: '/auth/error' // Error redirect page
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    trustHost: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
*/