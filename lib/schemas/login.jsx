import { z } from "zod";

export const schemaLogin = z.object({
    username: z.string()
        .min(1, 'Usuario requerido'),
    password: z.string()
        .min(1, 'Contraseña requerida')
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
})