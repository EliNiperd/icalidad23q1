'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { schemaLogin } from '@/lib/schemas/login';

export async function authenticate(prevState, formData) {
    const validatedFields = schemaLogin.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        // Devolver un mensaje de error genérico si la validación del cliente falló.
        // El formulario ya no muestra errores por campo.
        return 'Por favor, introduce un email y contraseña válidos.';
    }

    try {
        await signIn('credentials', formData);
        // La redirección ocurre automáticamente en caso de éxito, por lo que no se necesita retorno.
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
                default:
                    return 'Ha ocurrido un error. Por favor, inténtalo más tarde.';
            }
        }
        // Es importante volver a lanzar el error si no es uno que esperamos manejar.
        throw error;
    }
}
